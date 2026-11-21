import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { THEMES, THEME_VARS, DEFAULT_THEME_ID } from '../themes/themeData'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'corvexis-theme'

export function ThemeProvider({ children }) {
    const [themeId, setThemeId] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved && THEMES.some((t) => t.id === saved)) return saved
        } catch { /* ignore */ }
        return DEFAULT_THEME_ID
    })

    const theme = useMemo(
        () => THEMES.find((t) => t.id === themeId) || THEMES[0],
        [themeId]
    )

    useLayoutEffect(() => {
        const root = document.documentElement
        const vars = THEME_VARS[theme.id] || THEME_VARS[DEFAULT_THEME_ID]
        Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value)
        })
        root.dataset.theme = theme.id
        // Class-based hook as well, so styling survives anything rewriting data-theme
        THEMES.forEach((t) => root.classList.remove(`theme-${t.id}`))
        root.classList.add(`theme-${theme.id}`)
        root.style.colorScheme = theme.id === 'paper' ? 'light' : 'dark'
        try {
            localStorage.setItem(STORAGE_KEY, theme.id)
        } catch { /* ignore */ }
    }, [theme])

    const value = useMemo(
        () => ({ themeId: theme.id, theme, themes: THEMES, setTheme: setThemeId }),
        [theme]
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
