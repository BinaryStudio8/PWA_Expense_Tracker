export type ParsedTxn = {
  id: string;
  raw: string;
  sender?: string | null;
  amount?: number | null;
  currency?: string | null;
  direction?: "debit" | "credit" | "unknown";
  merchant?: string | null;
  accountMask?: string | null;
  timestamp?: string | null;
  createdAt?: number;
  confidence: number;
};
