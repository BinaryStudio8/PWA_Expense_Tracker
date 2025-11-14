export { }

declare global {
    interface Navigator {
        standalone?: boolean
    }

    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent
    }

    declare const __APP_VERSION__: string;
}
