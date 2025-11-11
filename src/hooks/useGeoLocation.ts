import { LocationDataProps } from "@/types"
import { useState, useEffect } from "react"

export const useGeoLocation = () => {
    const [location, setLocation] = useState<LocationDataProps | null>(null)
    const [locationEnabled, setLocationEnabled] = useState(false)
    const [fetchingLocation, setFetchingLocation] = useState(false)

    // ✅ Permission check on mount
    useEffect(() => {
        const checkPermission = async () => {
            if (!("permissions" in navigator)) return

            try {
                const status = await navigator.permissions.query({ name: "geolocation" })
                if (status.state === "granted") {
                    setLocationEnabled(true)
                    fetchLocation() // Auto-fetch silently
                }
                status.onchange = () => {
                    if (status.state === "denied") {
                        setLocationEnabled(false)
                        setLocation(null)
                    }
                }
            } catch (err) {
                console.warn("Permission check failed:", err)
            }
        }

        checkPermission()
    }, [])

    // 📍 Fetch location
    const fetchLocation = async (): Promise<LocationDataProps | null> => {
        if (!navigator.geolocation) {
            console.error("Geolocation not supported")
            return null
        }

        setFetchingLocation(true)

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords
                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        )
                        const data = await res.json()
                        const address = data.display_name || "Unknown location"
                        const loc = { latitude, longitude, address }
                        setLocation(loc)
                        setLocationEnabled(true)
                        resolve(loc)
                    } catch {
                        const loc = { latitude, longitude }
                        setLocation(loc)
                        resolve(loc)
                    } finally {
                        setFetchingLocation(false)
                    }
                },
                (err) => {
                    console.warn("Location error:", err)
                    setLocationEnabled(false)
                    setLocation(null)
                    setFetchingLocation(false)
                    resolve(null)
                },
                { enableHighAccuracy: true, timeout: 5000 }
            )
        })
    }

    return {
        location,
        locationEnabled,
        fetchingLocation,
        fetchLocation,
    }
}
