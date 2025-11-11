import type { Theme } from "./constants"

export interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}
