import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colorVariants, iconVariants, ModalProps } from "@/props";

export const Modal: React.FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  show = true,
  type = "info",
}) => {
  const color = colorVariants[type];
  const icon = iconVariants[type];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onCancel}
          />

          {/* Modal Card */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div
              className="w-[90%] max-w-sm bg-white dark:bg-gray-900/95 rounded-2xl shadow-2xl p-6 sm:p-7 
                                        border border-gray-200 dark:border-gray-700"
            >
              {/* Icon + Title */}
              <div className="flex flex-col items-center mb-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full 
                                                bg-linear-to-r ${color} text-white text-xl mb-3 shadow-md`}
                >
                  {icon}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
                  {title}
                </h2>
              </div>

              {/* Message */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed">
                {message}
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-3 sm:gap-4">
                <button
                  onClick={onCancel}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gray-200 dark:bg-gray-900/80 
                                                text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 
                                                dark:hover:bg-gray-600 transition-all duration-200 active:scale-95"
                >
                  {cancelText}
                </button>

                <button
                  onClick={onConfirm}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-linear-to-r ${color} 
                                                text-white font-medium hover:brightness-110 active:scale-95 
                                                shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
