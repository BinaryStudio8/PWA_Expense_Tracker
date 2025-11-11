export interface ServiceWorkerStatusProps {
    updateAvailable: boolean
    isRegistered: boolean
    registration: ServiceWorkerRegistration | null
    reloadApp: () => void
}