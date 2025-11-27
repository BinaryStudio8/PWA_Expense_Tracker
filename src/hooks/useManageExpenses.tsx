import { useMemo, useState } from "react";
import { useExpenseContext } from "@/context/expenseContext";
import { Eye, EyeOff, Layers } from "lucide-react";
import { ActionState, ActionType, FilterType } from "@/types";

export const useManageExpenses = () => {
  const {
    expenses,
    deleteExpense,
    restoreExpense,
    removeExpense,
    clearAll,
    purgeDeleted,
  } = useExpenseContext();

  const [filter, setFilter] = useState<FilterType>("all");
  const [query, setQuery] = useState("");
  const [pendingAction, setPendingAction] = useState<ActionState | null>(null);

  const stats = useMemo(() => {
    const activeItems = expenses.filter((expense) => !expense.deleted);
    const deletedItems = expenses.filter((expense) => expense.deleted);
    const activeTotal = activeItems.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const deletedTotal = deletedItems.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    return {
      totalCount: expenses.length,
      activeCount: activeItems.length,
      deletedCount: deletedItems.length,
      activeTotal,
      deletedTotal,
    };
  }, [expenses]);

  const sortedExpenses = useMemo(
    () =>
      [...expenses].sort((a, b) => {
        const timeA = new Date(`${a.date} ${a.time}`).getTime();
        const timeB = new Date(`${b.date} ${b.time}`).getTime();
        return timeB - timeA;
      }),
    [expenses],
  );

  const filteredExpenses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return sortedExpenses.filter((expense) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "active"
            ? !expense.deleted
            : expense.deleted;
      const matchesQuery =
        normalized.length === 0
          ? true
          : [
              expense.title,
              expense.description,
              expense.category,
              expense.merchant,
            ]
              .filter(Boolean)
              .some((field) => field!.toLowerCase().includes(normalized));
      return matchesFilter && matchesQuery;
    });
  }, [sortedExpenses, filter, query]);

  const openAction = (type: ActionType, id?: string | null) => {
    setPendingAction({ type, id: id ?? null });
  };

  const closeAction = () => setPendingAction(null);

  const confirmAction = () => {
    if (!pendingAction) return;
    const { type, id } = pendingAction;

    switch (type) {
      case "softDelete":
        if (id) deleteExpense(id);
        break;
      case "restore":
        if (id) restoreExpense(id);
        break;
      case "remove":
        if (id) removeExpense(id);
        break;
      case "purge":
        purgeDeleted();
        break;
      case "clear":
        clearAll();
        break;
    }

    closeAction();
  };

  const modalCopy = useMemo(() => {
    if (!pendingAction) return null;

    switch (pendingAction.type) {
      case "softDelete":
        return {
          title: "Move to Trash?",
          message:
            "This expense will be moved to trash. You can restore it later from here.",
          confirmText: "Move to Trash",
          type: "warning" as const,
        };
      case "restore":
        return {
          title: "Restore Expense?",
          message: "The expense will be restored to your active list.",
          confirmText: "Restore",
          type: "success" as const,
        };
      case "remove":
        return {
          title: "Delete Permanently?",
          message:
            "This will permanently remove the expense. This action cannot be undone.",
          confirmText: "Delete Forever",
          type: "error" as const,
        };
      case "purge":
        return {
          title: "Empty Trash?",
          message:
            "All trashed expenses will be deleted permanently. This cannot be undone.",
          confirmText: "Empty Trash",
          type: "error" as const,
        };
      case "clear":
        return {
          title: "Clear All Expenses?",
          message:
            "Every expense, including the trash, will be removed permanently.",
          confirmText: "Clear Everything",
          type: "error" as const,
        };
      default:
        return null;
    }
  }, [pendingAction]);

  const filterOptions: {
    label: string;
    value: FilterType;
    count: number;
    icon: React.ReactNode;
  }[] = [
    {
      label: "All",
      value: "all",
      count: stats.totalCount,
      icon: <Layers className="w-4 h-4" />,
    },
    {
      label: "Active",
      value: "active",
      count: stats.activeCount,
      icon: <Eye className="w-4 h-4" />,
    },
    {
      label: "Trash",
      value: "deleted",
      count: stats.deletedCount,
      icon: <EyeOff className="w-4 h-4" />,
    },
  ];

  const hasExpenses = expenses.length > 0;

  return {
    stats,
    sortedExpenses,
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
  };
};
