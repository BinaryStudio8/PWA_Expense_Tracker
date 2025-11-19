import { BeforeInstallPromptEvent } from "@/types";
import { useEffect, useState } from "react";
import { getPlatform } from "@/utils";

export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [installAvailable, setInstallAvailable] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const platform = getPlatform();

  useEffect(() => {
    let gotEvent = false;

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      gotEvent = true;
      setDeferredPrompt(e);
      setInstallAvailable(true);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallAvailable(false);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // If Chrome DIDN’T fire beforeinstallprompt → its blocked or unsupported
    const timeout = setTimeout(() => {
      if (!gotEvent) setBlocked(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setInstalled(true);
    }

    setDeferredPrompt(null);
    setInstallAvailable(false);
    setShowInstallModal(false);
  };

  return {
    installAvailable,
    installed,
    showInstallModal,
    setShowInstallModal,
    triggerInstall,
    blocked,
    platform,
  };
};
