import { createContext } from 'react'
import type { ExpenseContextType, ThemeContextType } from '../types'
import { useLocationPermission } from '@/hooks'

export const ThemeContext = createContext<ThemeContextType | null>(null)
export const ExpenseContext = createContext<ExpenseContextType | null>(null)
export const LocationContext = createContext<ReturnType<typeof useLocationPermission> | null>(null)

export type Theme = 'light' | 'dark'
export type ModalType = "info" | "success" | "warning" | "error"
export type SmsReceivedEvent = CustomEvent<string>
export type Direction = "credit" | "debit" | "unknown";
export type ScoreMap = Record<string, number>;

export const MERCHANT_KEYWORDS: Record<string, string> = {
    swiggy: "Swiggy",
    zomato: "Zomato",
    amazon: "Amazon",
    flipkart: "Flipkart",
    myntra: "Myntra",
    ola: "Ola",
    uber: "Uber",
    rapido: "Rapido",
    irctc: "IRCTC",
    blinkit: "Blinkit",
    bigbasket: "BigBasket",
    phonepe: "PhonePe",
    gpay: "Google Pay",
    "google pay": "Google Pay",
    paytm: "Paytm",
};

export const BANK_KEYWORDS: Record<string, string> = {
    sbi: "SBI",
    "state bank": "SBI",
    icici: "ICICI Bank",
    hdfc: "HDFC Bank",
    axis: "Axis Bank",
    kotak: "Kotak Bank",
    "yes bank": "Yes Bank",
    idfc: "IDFC Bank",
    pnb: "PNB",
};

export const TAG_KEYWORDS: Record<string, string> = {
    swiggy: "Food",
    zomato: "Food",
    pizza: "Food",
    restaurant: "Food",
    amazon: "Shopping",
    flipkart: "Shopping",
    myntra: "Shopping",
    ola: "Transport",
    uber: "Transport",
    rapido: "Transport",
    blinkit: "Groceries",
    bigbasket: "Groceries",
    hpcl: "Fuel",
    bpcl: "Fuel",
    petrol: "Fuel",
    electricity: "Bills",
    gas: "Bills",
    water: "Bills",
    internet: "Bills",
    recharge: "Bills",
    jio: "Bills",
    airtel: "Bills",
};

export const MEMORY_KEY = "sms_classifier_memory_v1";
export const MEMORY_LIMIT = 200;

