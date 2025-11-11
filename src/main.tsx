import ReactDOM from "react-dom/client"
import RootApp from "@/RootApp"
import "./index.css"

const container = document.getElementById("root")
if (!container) {
    throw new Error("❌ Root container not found. Make sure <div id='root'></div> exists in index.html.")
}

ReactDOM.createRoot(container).render(
    <RootApp />
)
