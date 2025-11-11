import { useState } from "react"
import { useExpenseContext } from "@/context/expenseContext"
import { useGeoLocation } from "@/hooks/useGeoLocation"

export const useAddExpense = () => {
    const { addExpense } = useExpenseContext()
    const { location, locationEnabled, fetchLocation, fetchingLocation } = useGeoLocation()

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [popupMessage, setPopupMessage] = useState("")
    const [popupType, setPopupType] = useState<"success" | "error" | "info">("info")
    const [showPopup, setShowPopup] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !amount.trim()) {
            setError("⚠️ Please fill out all required fields.")
            return
        }

        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError("⚠️ Please enter a valid amount greater than 0.")
            return
        }

        const now = new Date()
        const date = now.toLocaleDateString("en-CA") // YYYY-MM-DD
        const time = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })

        addExpense({
            title: title.trim(),
            amount: parsedAmount,
            date,
            time,
            description: description.trim() || undefined,
            location: locationEnabled ? location || undefined : undefined,
        })

        setTitle("")
        setAmount("")
        setDescription("")
        setError("")

        setPopupType("success")
        setPopupMessage("✅ Expense Added Successfully!")
        setShowPopup(true)
    }

    return {
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
        setPopupMessage,
        setPopupType,
        handleSubmit,
        location,
        locationEnabled,
        fetchingLocation,
        fetchLocation,
    }
}
