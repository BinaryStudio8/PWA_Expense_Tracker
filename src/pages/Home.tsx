import ExpenseList from "@/components/ExpenseList"
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics"

const Home = () => {
    const { total, todayTotal, maxExpense } = useDashboardMetrics()

    return (
        <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-8 space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
                    💰 Expense Dashboard
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium">
                    Stay on top of your finances — quick, simple, and visual.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-7 md:gap-8 w-full">
                {/* Total Spent */}
                <SummaryCard
                    title="Total Spent"
                    value={`₹${total.toFixed(2)}`}
                    gradient="from-blue-600 to-indigo-700"
                />

                {/* Today's Spend */}
                <SummaryCard
                    title="Today’s Spend"
                    value={`₹${todayTotal.toFixed(2)}`}
                    gradient="from-emerald-600 to-teal-700"
                />

                {/* Highest Expense */}
                <SummaryCard
                    title="Highest Expense"
                    value={`₹${maxExpense > 0 ? maxExpense.toFixed(2) : "0.00"}`}
                    gradient="from-rose-600 to-pink-700"
                />
            </div>

            {/* Expense List */}
            <div className="pt-4 sm:pt-6">
                <ExpenseList />
            </div>
        </div>
    )
}

export default Home

// ✅ Extracted inline reusable component
const SummaryCard = ({ title, value, gradient }: {
    title: string
    value: string
    gradient: string
}) => (
    <div className={`flex flex-col items-center justify-center text-center
                    bg-linear-to-br ${gradient}
                    text-white rounded-2xl
                    p-3 sm:p-4 shadow-xl hover:shadow-2xl
                    transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97]`}
    >
        <p className="text-xs sm:text-sm uppercase font-bold tracking-wider opacity-80">
            {title}
        </p>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 leading-tight drop-shadow-md">
            {value}
        </p>
    </div>
)
