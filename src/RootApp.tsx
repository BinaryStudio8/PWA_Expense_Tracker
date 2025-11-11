import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, ExpenseProvider } from "@/providers"
import App from "@/App"
import Popup from "@/components/Popup"
import { useServiceWorker } from "@/hooks/useServiceWorker"

const RootApp = () => {
    const { updateAvailable, reloadApp } = useServiceWorker()

    return (
        <>
            <BrowserRouter>
                <ThemeProvider>
                    <ExpenseProvider>
                            <App />
                    </ExpenseProvider>
                </ThemeProvider>
            </BrowserRouter>

            {updateAvailable && (
                <Popup
                    message="🆕 A new version of the app is available!"
                    type="info"
                    show={true}
                    onClose={reloadApp}
                />
            )}
        </>
    )
}

export default RootApp
