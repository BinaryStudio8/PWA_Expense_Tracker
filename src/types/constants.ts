import { createContext } from 'react'
import type { ThemeContextType } from '../types'

export type Theme = 'light' | 'dark'

export const ThemeContext = createContext<ThemeContextType | null>(null)