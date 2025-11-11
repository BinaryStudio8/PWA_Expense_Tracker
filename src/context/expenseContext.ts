import { createContext, useContext } from 'react'
import { ExpenseContextType } from '@/types'

export const ExpenseContext = createContext<ExpenseContextType | null>(null)

export const useExpenseContext = () => {
    const ctx = useContext(ExpenseContext)
    if (!ctx) throw new Error('useExpenseContext must be used within ExpenseProvider')
    return ctx
}
