import { useContext } from 'react'
import { ThemeContext } from 'types/constants'

export const useThemeContext = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider')
    return ctx
}
