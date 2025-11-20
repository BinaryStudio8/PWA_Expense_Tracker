import { useCallback, useEffect, useState } from "react";
import { ParsedTxn } from "@/props";
import { readPending, removePending } from "./pendingStore";
import { PENDING_TXN_EVENT } from "@/types";

export function useNotificationReview() {
  const [pending, setPending] = useState<ParsedTxn[]>([]);

  const refresh = useCallback(() => {
    setPending(readPending());
  }, []);

  useEffect(() => {
    refresh();

    if (typeof window === "undefined") return;

    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key === "pending_txns_v1") {
        refresh();
      }
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener(PENDING_TXN_EVENT, refresh);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(PENDING_TXN_EVENT, refresh);
    };
  }, [refresh]);

  const resolve = (id: string) => {
    removePending(id);
    refresh();
  };

  return { pending, refresh, resolve };
}
