import { createContext, useEffect, useState, ReactNode } from "react";

import PropTypes from "prop-types";

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
};

const initialState: ThemeContextType = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeContextType>(initialState);

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: string;
    storageKey?: string;
    [key: string]: any;
}

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }: ThemeProviderProps) {
    const [theme, setThemeState] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value: ThemeContextType = {
        theme,
        setTheme: (theme: string) => {
            localStorage.setItem(storageKey, theme);
            setThemeState(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider
            {...props}
            value={value}
        >
            {children}
        </ThemeProviderContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node,
    defaultTheme: PropTypes.string,
    storageKey: PropTypes.string,
};
