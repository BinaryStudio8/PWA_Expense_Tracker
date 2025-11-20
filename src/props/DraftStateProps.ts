import { ParsedTxn } from "./ParsedTxn";

export type DraftState = {
  id: string;
  title: string;
  amount: string;
  notes: string;
  direction: ParsedTxn["direction"];
  merchant?: string | null;
  sender?: string | null;
  confidence: number;
};
