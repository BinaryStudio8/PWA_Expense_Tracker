import Popup from "@/components/Popup"
import {
    IndianRupee,
    FileText,
    PlusCircle,
    StickyNote,
    MapPin,
    LocateFixed,
} from "lucide-react"
import { useAddExpense } from "@/hooks/useAddExpense"
import React from "react"

const AddExpense: React.FC = () => {
    const {
        title,
        amount,
        description,
        error,
        popupMessage,
        popupType,
        showPopup,
        setTitle,
        setAmount,
        setDescription,
        setShowPopup,
        handleSubmit,
        location,
        locationEnabled,
        fetchingLocation,
        fetchLocation,
    } = useAddExpense()

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm animate-fade-in"
            >
                {/* Expense Title */}
                <InputField
                    icon={<FileText />}
                    label="Expense Title"
                    placeholder="e.g. Coffee, Groceries, Taxi"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Amount */}
                <InputField
                    icon={<IndianRupee />}
                    label="Amount (₹)"
                    placeholder="Enter amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {/* Description */}
                <TextAreaField
                    icon={<StickyNote />}
                    label="Description (Optional)"
                    placeholder="Add notes like purpose, who, or where..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Location */}
                <div className="space-y-2">
                    {!locationEnabled && (
                        <button
                            type="button"
                            onClick={fetchLocation}
                            disabled={fetchingLocation}
                            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 border transition-all ${fetchingLocation
                                    ? "border-gray-400 text-gray-400 cursor-wait"
                                    : "border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                }`}
                        >
                            <LocateFixed className="h-5 w-5" />
                            {fetchingLocation ? "Requesting Location..." : "Use My Location"}
                        </button>
                    )}

                    {locationEnabled && location && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
                            <MapPin className="h-4 w-4" />
                            📍{" "}
                            {location.address ||
                                `${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)}`}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-sm font-medium p-3 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!title || !amount}
                    className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-sm transition-transform duration-300 ${title && amount
                            ? "bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-[1.03] active:scale-[0.97] hover:shadow-md"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    <PlusCircle className="h-5 w-5" />
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
    )
}

export default AddExpense

// ✅ Properly typed InputField
interface InputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    icon: React.ReactNode
}

const InputField: React.FC<InputFieldProps> = ({ icon, label, ...props }) => (
    <div className="flex flex-col space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500">
                {icon}
            </div>
            <input
                {...props}
                className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
        </div>
    </div>
)

// ✅ Properly typed TextAreaField
interface TextAreaFieldProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    icon: React.ReactNode
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ icon, label, ...props }) => (
    <div className="flex flex-col space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500">
                {icon}
            </div>
            <textarea
                {...props}
                className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all min-h-20 resize-none"
            />
        </div>
    </div>
)
