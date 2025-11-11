import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { PopupProps } from "@/types"

const Popup = ({ message, type = "info", show, onClose }: PopupProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    const colorVariants = {
        success: "bg-green-500/95 border-green-400 text-white",
        error: "bg-red-500/95 border-red-400 text-white",
        info: "bg-blue-500/95 border-blue-400 text-white",
    }

    const popup = (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 70, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`
                        fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 
                        z-9999 px-5 py-3 sm:px-6 sm:py-3.5
                        rounded-2xl border font-semibold text-sm sm:text-base
                        shadow-xl backdrop-blur-md
                        ${colorVariants[type]}
                    `}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    )

    return createPortal(popup, document.body)
}

export default Popup
