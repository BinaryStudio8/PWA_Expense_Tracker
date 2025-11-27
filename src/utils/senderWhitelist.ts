import { NORMALIZED_WHITELIST } from "@/types";

function normalizeSender(sender: string) {
  return sender
    .toUpperCase()
    .replace(/^COM\./, "")
    .replace(/[^A-Z0-9]/g, "");
}

export function detectSenderWhitelisted(sender?: string | null): boolean {
  if (!sender) return false;

  const normalized = normalizeSender(sender);
  if (!normalized) return false;

  return NORMALIZED_WHITELIST.some((token) => normalized.includes(token));
}
