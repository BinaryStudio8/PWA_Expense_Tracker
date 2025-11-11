import { CalendarDays, IndianRupee, Clock } from "lucide-react"
import { format, parse } from "date-fns"
import { useDailyExpenses } from "@/hooks/useDailyExpenses"

const Daily = () => {
    const { groupedExpenses, sortedDates, dailyTotals, hasExpenses } = useDailyExpenses()

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Daily Expenses
                </h2>
            </div>

            {!hasExpenses ? (
                <p className="text-gray-500 dark:text-gray-400">
                    No expenses yet. Add one to see your daily breakdown.
                </p>
            ) : (
                sortedDates.map((date) => (
                    <div
                        key={date}
                        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 sm:p-5 space-y-4"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {format(parse(date, "yyyy-MM-dd", new Date()), "dd MMM yyyy")}
                            </h3>
                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                                <IndianRupee className="h-4 w-4" />
                                {dailyTotals[date].toFixed(2)}
                            </div>
                        </div>

                        {/* Expense Items */}
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {groupedExpenses[date].map((expense, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                                            {expense.title}
                                        </span>
                                    </div>
                                    <span className="text-gray-900 dark:text-gray-100 font-semibold">
                                        ₹{expense.amount.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Daily
