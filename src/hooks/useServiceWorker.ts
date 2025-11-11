import { ServiceWorkerStatusProps } from "@/types"
import { useEffect, useState } from "react"

export const useServiceWorker = (): ServiceWorkerStatusProps => {
    const [updateAvailable, setUpdateAvailable] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

    useEffect(() => {
        if (!("serviceWorker" in navigator)) {
            console.warn("⚠️ Service workers are not supported in this browser.")
            return
        }

        let refreshing = false

        const registerServiceWorker = async () => {
            try {
                const reg = await navigator.serviceWorker.register("/sw.js")
                console.log("✅ Service Worker registered:", reg.scope)
                setRegistration(reg)
                setIsRegistered(true)

                reg.addEventListener("updatefound", () => {
                    const newWorker = reg.installing
                    if (!newWorker) return

                    newWorker.addEventListener("statechange", () => {
                        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                            console.log("🆕 New version detected — waiting for user action.")
                            setUpdateAvailable(true)
                        }
                    })
                })
            } catch (error) {
                console.error("❌ Service Worker registration failed:", error)
            }
        }

        window.addEventListener("load", registerServiceWorker)

        const handleControllerChange = () => {
            if (refreshing) return
            refreshing = true
            console.log("♻️ Controller changed — new version activated.")
            window.location.reload()
        }

        navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange)

        return () => {
            window.removeEventListener("load", registerServiceWorker)
            navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange)
        }
    }, [])

    const reloadApp = () => {
        console.log("🔄 Reloading app to activate new version...")
        window.location.reload()
    }

    return { updateAvailable, isRegistered, registration, reloadApp }
}
