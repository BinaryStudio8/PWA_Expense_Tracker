import { Routes, Route } from "react-router-dom"
import DashboardLayout from "@/layout/DashboardLayout"
import Home from "@/pages/Home"
import Daily from "@/pages/Daily"
import Monthly from "@/pages/Monthly"
import Analysis from "@/pages/Analysis"
import Settings from "@/pages/Settings"
import AddExpensePage from "@/pages/AddExpensePage"

const App = () => (
  <DashboardLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddExpensePage />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/monthly" element={<Monthly />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </DashboardLayout>
)

export default App
