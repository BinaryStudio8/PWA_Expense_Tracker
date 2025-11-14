import { Direction } from "@/types";

export type ClassificationProps = {
    amount: number | null;
    direction: Direction;
    category: string;
    party: string | null;
    raw: string;
    hash: string;
    confidence: number;
    tags: string[];
};
