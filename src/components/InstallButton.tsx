import { useInstallPrompt } from "@/hooks";
import { motion } from "framer-motion";

export const InstallButton = () => {
  const { installAvailable, triggerInstall, installed } = useInstallPrompt();

  if (installed) return null;
  if (!installAvailable)
    return (
      <button
        disabled
        className="w-full bg-gray-400 text-white py-2 rounded-md font-medium shadow-lg cursor-not-allowed opacity-70"
      >
        Not Installable
      </button>
    );

  return (
    <motion.button
      onClick={triggerInstall}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 
        bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 
        text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full 
        shadow-lg text-sm sm:text-base font-medium 
        transition-transform hover:scale-105 z-50"
      whileTap={{ scale: 0.95 }}
    >
      📲 Install App
    </motion.button>
  );
};
