import React from "react"
import { LocationContext } from "@/types"
import { useLocationPermission } from "@/hooks"
import { LocationProviderProps } from "@/props"

export const LocationProvider = ({ children }: LocationProviderProps) => {
    const locationState = useLocationPermission()
    return (
        <LocationContext.Provider value={locationState}>
            {children}
        </LocationContext.Provider>
    )
}