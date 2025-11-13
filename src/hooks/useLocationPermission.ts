import { useState, useEffect } from "react"

export const useLocationPermission = () => {
    const [permissionGranted, setPermissionGranted] = useState(
        localStorage.getItem("locationPermission") === "true"
    )

    const [fetching, setFetching] = useState(false)
    const [location, setLocation] = useState(() => {
        const stored = localStorage.getItem("userLocation")
        return stored ? JSON.parse(stored) : null
    })

    const fetchLocation = () => {
        if (!navigator.geolocation) return

        setFetching(true)
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords

                let address
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    )
                    const data = await res.json()
                    address = data.display_name
                } catch { /* empty */ }

                const loc = { latitude, longitude, address }
                setLocation(loc)
                localStorage.setItem("userLocation", JSON.stringify(loc))
                setFetching(false)
            },
            () => setFetching(false),
            { enableHighAccuracy: true, timeout: 7000 }
        )
    }

    const requestLocationPermission = () => {
        if (!navigator.geolocation) return

        navigator.geolocation.getCurrentPosition(
            () => {
                setPermissionGranted(true)
                localStorage.setItem("locationPermission", "true")
                fetchLocation()
            },
            () => {
                setPermissionGranted(false)
                localStorage.setItem("locationPermission", "false")
            }
        )
    }

    const revokePermission = () => {
        localStorage.removeItem("locationPermission")
        localStorage.removeItem("userLocation")
        setPermissionGranted(false)
        setLocation(null)
    }

    useEffect(() => {
        if (permissionGranted) fetchLocation()
    }, [permissionGranted])

    return {
        permissionGranted,
        requestLocationPermission,
        revokePermission,
        fetchLocation,
        fetching,
        location,
    }
}
