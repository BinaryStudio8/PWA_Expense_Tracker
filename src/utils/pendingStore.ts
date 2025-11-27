import { ParsedTxn } from "@/props";
import { KEY, PENDING_TXN_EVENT } from "@/types";

function emitChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PENDING_TXN_EVENT));
}

export function readPending(): ParsedTxn[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function writePending(arr: ParsedTxn[]) {
  localStorage.setItem(KEY, JSON.stringify(arr));
  emitChange();
}

export function pushPending(item: ParsedTxn) {
  const list = readPending();
  list.unshift(item);
  writePending(list.slice(0, 200));
}

export function removePending(id: string) {
  const list = readPending().filter((i) => i.id !== id);
  writePending(list);
}
