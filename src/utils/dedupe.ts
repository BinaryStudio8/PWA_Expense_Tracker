import { DEDUPE_KEY, DedupRecord, TTL_MS } from "@/types";

function readStore(): DedupRecord[] {
  try {
    return JSON.parse(localStorage.getItem(DEDUPE_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeStore(arr: DedupRecord[]) {
  localStorage.setItem(DEDUPE_KEY, JSON.stringify(arr));
}

export function isDuplicate(id: string) {
  const now = Date.now();
  const arr = readStore().filter((r) => now - r.createdAt < TTL_MS);
  const found = arr.find((r) => r.id === id);
  if (found) return true;
  arr.push({ id, createdAt: now });
  writeStore(arr);
  return false;
}
