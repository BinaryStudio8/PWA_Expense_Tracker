import React from "react";
import { Modal } from "@/base";
import { formatIndianCurrency } from "@/utils";
import {
  Filter,
  Undo2,
  Trash2,
  ShieldCheck,
  Search,
  Layers,
} from "lucide-react";
import { useManageExpenses } from "@/hooks/useManageExpenses"; // Adjust path as needed

export const ManageExpenses: React.FC = () => {
  const {
    stats,
    filteredExpenses,
    filter,
    setFilter,
    query,
    setQuery,
    pendingAction,
    openAction,
    closeAction,
    confirmAction,
    modalCopy,
    hasExpenses,
    filterOptions,
  } = useManageExpenses();

  return (
    <div className="w-full mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 sm:space-y-10 bg-gray-50 dark:bg-gray-900/1">
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
        <div>
          <p className="text-sm uppercase tracking-widest text-blue-500 font-semibold mb-2 flex items-center gap-2 break-words whitespace-normal min-w-0 max-w-full">
            <Layers className="w-4 h-4" />
            Expense Control Center
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 break-words whitespace-normal min-w-0 max-w-full">
            Manage Expenses
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 break-words whitespace-normal min-w-0 max-w-full">
            Move entries to trash, restore important ones, or clean up forever —
            you are in full control.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={stats.deletedCount === 0}
            onClick={() => openAction("purge")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              stats.deletedCount === 0
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 border border-orange-200 dark:border-orange-900 hover:-translate-y-0.5 hover:shadow-md"
            }`}
            aria-label="Empty trash"
          >
            <Trash2 className="w-4 h-4" />
            Empty Trash
          </button>
          <button
            type="button"
            disabled={!hasExpenses}
            onClick={() => openAction("clear")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              !hasExpenses
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900 hover:-translate-y-0.5 hover:shadow-md"
            }`}
            aria-label="Clear all expenses"
          >
            <ShieldCheck className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-5 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm uppercase opacity-80 break-words whitespace-normal min-w-0 max-w-full">
            Active Amount
          </p>
          <p className="text-2xl font-bold mt-2 break-words whitespace-normal min-w-0 max-w-full">
            ₹{formatIndianCurrency(stats.activeTotal)}
          </p>
          <p className="text-sm opacity-80 mt-1 break-words whitespace-normal min-w-0 max-w-full">
            {stats.activeCount} entries
          </p>
        </div>
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm uppercase text-gray-500 dark:text-gray-400 break-words whitespace-normal min-w-0 max-w-full">
            Trashed Amount
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2 break-words whitespace-normal min-w-0 max-w-full">
            ₹{formatIndianCurrency(Math.abs(stats.deletedTotal))}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-words whitespace-normal min-w-0 max-w-full">
            {stats.deletedCount} entries
          </p>
        </div>
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <p className="text-sm uppercase text-gray-500 dark:text-gray-400 break-words whitespace-normal min-w-0 max-w-full">
            Total Items
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2 break-words whitespace-normal min-w-0 max-w-full">
            {stats.totalCount}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-words whitespace-normal min-w-0 max-w-full">
            Combined active & trash
          </p>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-lg space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-medium transition-all duration-200 ${
                  filter === option.value
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-sm"
                }`}
                aria-pressed={filter === option.value}
                aria-label={`Filter by ${option.label.toLowerCase()}`}
              >
                {option.icon}
                {option.label}
                <span
                  className={`text-xs font-semibold ${
                    filter === option.value
                      ? "text-white/80"
                      : "text-gray-500 dark:text-gray-400"
                  } break-words whitespace-normal min-w-0 max-w-full`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, merchant, category"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all break-words whitespace-normal min-w-0 max-w-full"
              aria-label="Search expenses"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 border-b border-dashed border-gray-200 dark:border-gray-700 pb-3">
          <span className="inline-flex items-center gap-2 break-words whitespace-normal min-w-0 max-w-full">
            <Filter className="w-3.5 h-3.5" />
            {filteredExpenses.length} results
          </span>
          <span className="break-words whitespace-normal min-w-0 max-w-full">
            Newest first
          </span>
        </div>

        {/* Expense List */}
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 break-words whitespace-normal min-w-0 max-w-full">
              Nothing to show here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 break-words whitespace-normal min-w-0 max-w-full">
              Try switching filters or clearing the search text.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExpenses.map((expense) => {
              const dateTime = new Date(
                `${expense.date} ${expense.time}`,
              ).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              const isCredit = expense.direction === "credit";
              const isDeleted = Boolean(expense.deleted);

              return (
                <div
                  key={expense.id}
                  className={`rounded-3xl border p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 ${
                    isDeleted
                      ? "bg-gray-50/70 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800"
                      : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700"
                  }`}
                >
                  <div className="space-y-2 flex-1 min-w-0 overflow-hidden">
                    {" "}
                    {/* Added overflow-hidden for safety */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 break-words">
                        {expense.title}
                      </p>
                      {expense.category && (
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 break-words whitespace-normal min-w-0 max-w-full">
                          {expense.category}
                        </span>
                      )}
                      {isDeleted && (
                        <span className="text-xs px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 break-words whitespace-normal min-w-0 max-w-full">
                          In Trash
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 break-words whitespace-normal min-w-0 max-w-full">
                      {dateTime}
                      {expense.merchant ? ` • ${expense.merchant}` : ""}
                    </p>
                    {expense.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 break-words whitespace-normal min-w-0 max-w-full">
                        {expense.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end gap-3 min-w-0 shrink-0 sm:min-w-[160px]">
                    <span
                      className={`text-xl font-bold ${
                        isCredit
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      } break-words whitespace-normal min-w-0 max-w-full`}
                    >
                      ₹{formatIndianCurrency(Math.abs(expense.amount))}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {isDeleted ? (
                        <>
                          <button
                            type="button"
                            onClick={() => openAction("restore", expense.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 text-sm font-semibold hover:-translate-y-0.5 transition-transform bg-emerald-50/60 dark:bg-emerald-950/30 hover:shadow-sm"
                            aria-label="Restore expense"
                          >
                            <Undo2 className="w-4 h-4" />
                            Restore
                          </button>
                          <button
                            type="button"
                            onClick={() => openAction("remove", expense.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm font-semibold hover:-translate-y-0.5 transition-transform bg-red-50/60 dark:bg-red-950/30 hover:shadow-sm"
                            aria-label="Delete expense permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Forever
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openAction("softDelete", expense.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-300 text-sm font-semibold hover:-translate-y-0.5 transition-transform bg-orange-50/60 dark:bg-orange-950/30 hover:shadow-sm"
                          aria-label="Move to trash"
                        >
                          <Trash2 className="w-4 h-4" />
                          Move to Trash
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {pendingAction && modalCopy && (
        <Modal
          show
          title={modalCopy.title}
          message={modalCopy.message}
          confirmText={modalCopy.confirmText}
          type={modalCopy.type}
          onCancel={closeAction}
          onConfirm={confirmAction}
        />
      )}
    </div>
  );
};

export default ManageExpenses;
