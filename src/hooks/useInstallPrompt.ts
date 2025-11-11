import { useEffect, useState } from "react"
import type { BeforeInstallPromptEvent } from "@/types/BeforeInstallPromptEvent"

export const useInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [installAvailable, setInstallAvailable] = useState(false)
    const [installed, setInstalled] = useState(false)

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setInstallAvailable(true)
            console.log("🟢 beforeinstallprompt captured")
        }

        const handleAppInstalled = () => {
            console.log("✅ PWA installed successfully!")
            setInstalled(true)
            setInstallAvailable(false)
            setDeferredPrompt(null)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        window.addEventListener("appinstalled", handleAppInstalled)

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
            window.removeEventListener("appinstalled", handleAppInstalled)
        }
    }, [])

    const promptInstall = async () => {
        if (!deferredPrompt) {
            console.warn("⚠️ No install prompt available yet")
            return
        }

        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log("User choice:", outcome)

        if (outcome === "accepted") {
            console.log("✅ User accepted install")
            setInstalled(true)
        }

        setDeferredPrompt(null)
        setInstallAvailable(false)
    }

    return { installAvailable, installed, promptInstall }
}
