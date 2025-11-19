import React from "react";
import {
  IndianRupee,
  FileText,
  PlusCircle,
  StickyNote,
  MapPin,
  Tag,
  CheckCircle,
} from "lucide-react";
import { useLocationContext } from "@/context";
import { InputField, Popup, TextAreaField } from "@/base";
import { Listbox, Transition } from "@headlessui/react";
import { useAddExpense } from "@/hooks";

export const AddExpense: React.FC = () => {
  const {
    title,
    amount,
    description,
    category,
    error,
    popupMessage,
    popupType,
    showPopup,
    setTitle,
    setAmount,
    setDescription,
    setCategory,
    setShowPopup,
    handleSubmit,
  } = useAddExpense();

  const { permissionGranted, location } = useLocationContext();

  const categories = [
    "Food & Drinks",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Health",
    "Education",
    "Other",
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Title and Amount Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Title */}
          <div className="space-y-2">
            <InputField
              icon={<FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />}
              label="Expense Title"
              placeholder="e.g. Coffee, Groceries, Taxi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900/80 border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <InputField
              icon={
                <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              }
              label="Amount (₹)"
              placeholder="0.00"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900/80 border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
            Category
          </label>
          <div className="relative">
            <Tag className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white" />
            <Listbox value={category} onChange={setCategory}>
              <Listbox.Button className="flex items-center w-full bg-gray-50 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-gray-800 transition-all duration-200">
                <span className="truncate">
                  {category || "Select a category"}
                </span>
                <span className="absolute right-3 sm:right-4 text-gray-500 dark:text-gray-400">
                  ▼
                </span>
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Listbox.Options className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow-xl max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <Listbox.Option
                      key={cat}
                      value={cat}
                      className={({ active, selected }) =>
                        `rounded-sm px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base cursor-pointer transition-colors duration-150 ${
                          active ? "bg-purple-100 dark:bg-gray-900" : ""
                        } ${selected ? "font-semibold text-purple-600 dark:text-white" : ""}`
                      }
                    >
                      {({ selected }) => (
                        <div className="flex justify-between items-center">
                          <span className="truncate">{cat}</span>
                          {selected && (
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <TextAreaField
            icon={<StickyNote className="h-4 w-4 sm:h-5 sm:w-5 text-white" />}
            label="Description (Optional)"
            placeholder="Add any additional notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 dark:bg-gray-900/80 border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-orange-500 transition-all duration-200"
          />
        </div>

        {/* Location Display */}
        {permissionGranted && location && (
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl sm:rounded-2xl text-gray-700 dark:text-gray-300">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0" />
            <span className="font-medium text-sm sm:text-base">
              {location.address ||
                `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-sm sm:text-base p-3 sm:p-4 rounded-xl sm:rounded-2xl">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!title || !amount}
          className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg text-white flex items-center justify-center gap-2 sm:gap-3 shadow-xl active:scale-95 transition-all duration-200 ${
            title && amount
              ? "bg-linear-to-r from-blue-800 to-purple-500 hover:from-blue-800 hover:to-purple-700"
              : "bg-gray-400 dark:bg-gray-600 opacity-50 cursor-not-allowed"
          }`}
        >
          <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          Add Expense
        </button>
      </form>

      <Popup
        message={popupMessage}
        type={popupType}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};
