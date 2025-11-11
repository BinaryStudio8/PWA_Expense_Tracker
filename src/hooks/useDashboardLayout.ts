import { useEffect, useState } from "react"

export const useDashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    // Handle responsive layout dynamically
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Toggle sidebar visibility
    const toggleSidebar = () => setSidebarOpen((prev) => !prev)

    // Close sidebar on navigation (mobile only)
    const closeSidebarOnMobile = () => {
        if (isMobile) setSidebarOpen(false)
    }

    // List of nav items
    const navItems = [
        { label: "🏠 Overview", to: "/" },
        { label: "➕ Add Expense", to: "/add" },
        { label: "📅 Daily Expense", to: "/daily" },
        { label: "📈 Monthly Expense", to: "/monthly" },
        { label: "📊 Analysis", to: "/analysis" },
        { label: "⚙️ Settings", to: "/settings" },
    ]

    return {
        sidebarOpen,
        isMobile,
        toggleSidebar,
        closeSidebarOnMobile,
        navItems,
        setSidebarOpen,
    }
}
