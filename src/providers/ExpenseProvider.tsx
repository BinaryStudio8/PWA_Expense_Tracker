import { useState, useEffect } from 'react'
import { ExpenseContext } from '../context/expenseContext'
import type { Expense } from '@/types/Expense'

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<Expense[]>(() => {
        const stored = localStorage.getItem('expenses')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])

    const addExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense = { id: crypto.randomUUID(), ...expense }
        setExpenses((prev) => [newExpense, ...prev])
    }

    const deleteExpense = (id: string) => {
        setExpenses((prev) => prev.filter((e) => e.id !== id))
    }

    const clearAll = () => {
        if (confirm('Clear all expenses?')) setExpenses([])
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    return (
        <ExpenseContext.Provider
            value={{ expenses, addExpense, deleteExpense, clearAll, total }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}
