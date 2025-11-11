import ThemeToggle from "@/components/ThemeToggle"
import { useInstallPrompt } from "@/hooks/useInstallPrompt"
import { useState, useEffect } from "react"

const Settings = () => {
    const { installAvailable, promptInstall } = useInstallPrompt()
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        // Check if PWA is installed (standalone mode)
        const checkInstalled = () => {
            setIsInstalled(window.matchMedia("(display-mode: standalone)").matches)
        }
        checkInstalled()
        window.addEventListener("appinstalled", checkInstalled)
        return () => window.removeEventListener("appinstalled", checkInstalled)
    }, [])

    return (
        <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-3xl">
                {/* Header */}
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-1 sm:mb-2">
                        <span className="text-2xl sm:text-3xl">⚙️</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Settings
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                        Customize your experience
                    </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {/* 🌙 Appearance */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-3 sm:p-4 transition-colors">
                        <div className="flex items-center mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                                <span className="text-white text-sm sm:text-lg">🌙</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                Appearance
                            </h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                            Toggle between light and dark themes for a personalized look.
                        </p>
                        <div className="flex justify-center">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* 📱 App Installation */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-3 sm:p-4 transition-colors">
                        <div className="flex items-center mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                                <span className="text-white text-sm sm:text-lg">📱</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                App Installation
                            </h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                            Install the app for offline access and faster performance.
                        </p>
                        <div className="flex justify-center">
                            {isInstalled ? (
                                <button
                                    disabled
                                    className="w-full sm:w-64 bg-linear-to-r from-green-400 to-green-500 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl font-semibold shadow-lg text-sm sm:text-base cursor-not-allowed"
                                >
                                    ✅ Already Installed
                                </button>
                            ) : installAvailable ? (
                                <button
                                    onClick={promptInstall}
                                    className="w-full sm:w-64 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                                                text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl font-semibold transition-all duration-200
                                                hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                >
                                    📲 Install Now
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="w-full sm:w-64 bg-linear-to-r from-gray-400 to-gray-500 text-gray-300 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl font-semibold shadow-lg text-sm sm:text-base cursor-not-allowed"
                                >
                                    📲 Not Available
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ℹ️ App Information */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-3 sm:p-4 transition-colors">
                        <div className="flex items-center mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                                <span className="text-white text-sm sm:text-lg">ℹ️</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                App Information
                            </h3>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Version
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-600 px-2 sm:px-3 py-1 rounded-lg text-sm sm:text-base">
                                    1.0.0
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Your data is stored securely in your browser. No cloud sync yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
