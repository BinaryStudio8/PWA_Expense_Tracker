import { useExpenseContext } from "@/context/expenseContext"

const ExpenseList = () => {
    const { expenses, deleteExpense, clearAll, total } = useExpenseContext()

    if (expenses.length === 0)
        return (
            <div className="text-center mt-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No expenses yet. Start adding your first one! 💸
                </p>
            </div>
        )

    return (
        <div className="space-y-6">
            {/* Header Row */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Recent Expenses
                </h3>
                <button
                    onClick={clearAll}
                    className="text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* List of Expenses */}
            <div className="space-y-4">
                {expenses.map((e) => (
                    <div
                        key={e.id}
                        className="flex justify-between items-center bg-white dark:bg-gray-800
                                    border border-gray-100 dark:border-gray-700 rounded-2xl p-4
                                    shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">{e.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(e.date).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="font-bold text-green-600 dark:text-green-400 text-sm sm:text-base">
                                ₹{e.amount.toFixed(2)}
                            </span>
                            <button
                                onClick={() => deleteExpense(e.id)}
                                className="text-red-500 hover:text-red-600 dark:hover:text-red-400 font-bold text-lg transition-transform hover:scale-110"
                                title="Delete Expense"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Section */}
            <div className="mt-6 text-right">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Total:{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                        ₹{total.toFixed(2)}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default ExpenseList
