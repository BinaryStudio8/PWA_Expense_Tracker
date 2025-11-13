import { LocationContext } from "@/types"
import { useContext } from "react"

export const useLocationContext = () => {
    const ctx = useContext(LocationContext)
    if (!ctx) throw new Error("useLocationContext must be used inside LocationProvider")
    return ctx
}
