import { useExpenseContext } from "@/context/expenseContext"

export const useDashboardMetrics = () => {
    const { expenses, total } = useExpenseContext()

    // Get today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0]

    // Calculate total spent today
    const todayTotal = expenses
        .filter((expense) => expense.date === today)
        .reduce((sum, expense) => sum + expense.amount, 0)

    // Find highest expense
    const maxExpense = expenses.length
        ? Math.max(...expenses.map((e) => e.amount))
        : 0

    return {
        expenses,
        total,
        today,
        todayTotal,
        maxExpense,
    }
}
