import { useState, useEffect } from 'react'
import { Theme, ThemeContext } from '@/types/constants'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(
        (localStorage.getItem('theme') as Theme) || 'light'
    )

    useEffect(() => {
        const html = document.documentElement
        if (theme === 'dark') html.classList.add('dark')
        else html.classList.remove('dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
