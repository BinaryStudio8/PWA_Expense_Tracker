import { PlusCircle } from "lucide-react";
import { AddExpense } from "@/components";

export const AddExpensePage = () => (
  <div className=" dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <PlusCircle className="h-7 w-7 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Add New Expense
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Track your spending effortlessly.
      </p>

      {/* Divider */}
      <hr className="border-gray-300 dark:border-gray-700 mb-5" />

      {/* Main Form */}
      <main
        className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl 
                      p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 mt-4"
      >
        <AddExpense />
      </main>
    </div>
  </div>
);
