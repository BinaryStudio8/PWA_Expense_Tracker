import { ParsedTxn } from "./ParsedTxn";

export type DetectedReviewProps = {
  txn: ParsedTxn;
  onAccept: (id: string) => void;
  onIgnore: (id: string) => void;
  onEdit?: (txn: ParsedTxn) => void;
};
