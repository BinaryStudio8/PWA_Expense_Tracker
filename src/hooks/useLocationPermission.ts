import { useState } from "react"

export const useLocationPermission = () => {
    const [permissionGranted, setPermissionGranted] = useState<boolean>(
        localStorage.getItem("locationPermission") === "true"
    )

    const [fetching, setFetching] = useState(false)
    const [location, setLocation] = useState<{
        latitude: number
        longitude: number
        address?: string
    } | null>(() => {
        const stored = localStorage.getItem("userLocation")
        return stored ? JSON.parse(stored) : null
    })

    const requestLocationPermission = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported on this device.")
            return
        }

        setFetching(true)
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords
                let address: string | undefined

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    )
                    const data = await response.json()
                    address = data.display_name
                } catch {
                    address = undefined
                }

                const loc = { latitude, longitude, address }
                setLocation(loc)
                setPermissionGranted(true)
                localStorage.setItem("locationPermission", "true")
                localStorage.setItem("userLocation", JSON.stringify(loc))
                setFetching(false)
            },
            (err) => {
                console.warn("❌ Location access denied or failed:", err)
                setFetching(false)
                setPermissionGranted(false)
                localStorage.setItem("locationPermission", "false")
            },
            { enableHighAccuracy: true, timeout: 7000 }
        )
    }

    const revokePermission = () => {
        localStorage.removeItem("locationPermission")
        localStorage.removeItem("userLocation")
        setPermissionGranted(false)
        setLocation(null)
    }

    return {
        permissionGranted,
        requestLocationPermission,
        revokePermission,
        fetching,
        location,
    }
}
