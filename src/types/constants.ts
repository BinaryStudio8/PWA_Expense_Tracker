import { createContext } from "react";
import type { ExpenseContextType, ThemeContextType } from "../types";
import { useLocationPermission } from "@/hooks";

export type Theme = "light" | "dark";
export type ModalType = "info" | "success" | "warning" | "error";
export type SmsReceivedEvent = CustomEvent<string>;
export type Direction = "credit" | "debit" | "unknown";
export type ScoreMap = Record<string, number>;
export type DedupRecord = { id: string; createdAt: number };

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const ExpenseContext = createContext<ExpenseContextType | null>(null);
export const LocationContext = createContext<ReturnType<
  typeof useLocationPermission
> | null>(null);
export const CREDIT_KEYWORDS = /\b(credited|refund|cashback|deposit)\b/i;
export const DEBIT_KEYWORDS =
  /\b(debited|spent|paid|withdrawn|payment|txn|transfer)\b/i;
export const DEDUPE_KEY = "notif_dedupe_v1";
export const PENDING_TXN_EVENT = "pending-txn-updated";
export const TTL_MS = 90_000;
export const KEY = "pending_txns_v1";
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
export const AMOUNT_PATTERNS = [
  /(?:₹|Rs\.?|INR)\s*([0-9]{1,3}(?:[0-9,]*)(?:\.[0-9]{1,2})?)/gi,
  /([0-9]{1,3}(?:[0-9,]*)(?:\.[0-9]{1,2})?)\s*(?:INR|Rs|₹)/gi,
];
export const KNOWN_BANK_TOKENS = [
  // Major banks
  "SBI",
  "SBIPSG",
  "SBIPAY",
  "SBICRD",
  "SBIINB",
  "HDFC",
  "HDFCBK",
  "HDFCPAY",
  "HDFCCR",
  "ICICI",
  "ICICIB",
  "ICICIPAY",
  "ICICICARD",
  "AXIS",
  "AXISBK",
  "AXISUPI",
  "AXISCR",
  "KOTAK",
  "KOTAKB",
  "KOTAKUPI",
  "YESBANK",
  "YESBNK",
  "YESUPI",
  "PNB",
  "PNBBNK",
  "BOB",
  "BANKOFBARODA",
  "BARODABANK",
  "UNION",
  "UNIONBANK",
  "IDFC",
  "IDFCFIRST",
  "CANARA",
  "CANARABANK",
  "INDUSIND",
  "INDUSBNK",
  "FEDERAL",
  "FEDERALBANK",

  // UPI apps
  "GOOGLEPAY",
  "GPAY",
  "TEZ",
  "PHONEPE",
  "PHNPAY",
  "PAYTM",
  "PAYTMPAY",
  "BHIM",
  "UPI",
  "NPCI",

  // Wallets, fintech, cards
  "AMAZONPAY",
  "AMAZON",
  "AMZPAY",
  "CRED",
  "CREDPAY",
  "ONECARD",
  "SBICARD",
  "HDFCCARD",
  "ICICICARD",
  "UNIPAY",
  "SLICE",
  "LAZYPAY",
  "MOBIKWIK",
  "WALLET",
  "OLA",
  "OLA MONEY",

  // Payment gateways
  "RAZORPAY",
  "CASHFREE",
  "PAYU",
  "PAYG",
];
export const NORMALIZED_WHITELIST = KNOWN_BANK_TOKENS.map((t) =>
  t.toUpperCase().replace(/[^A-Z0-9]/g, ""),
);
