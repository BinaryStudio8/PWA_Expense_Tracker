import AddExpense from "@/components/AddExpense"

const AddExpensePage = () => (
    <div className="flex items-center justify-center px-4 py-8 bg-linear-to-br from-blue-50 via-sky-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="w-full max-w-md sm:max-w-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-lg p-5 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-400">
                ➕ Add New Expense
            </h1>
            <AddExpense />
        </div>
    </div>
)

export default AddExpensePage
