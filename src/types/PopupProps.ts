export interface PopupProps {
    message: string
    type?: "success" | "error" | "info"
    show: boolean
    onClose: () => void
}