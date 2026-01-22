import { createContext, useContext } from 'react';
import { useState } from 'react';

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};


const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvider({children}:{children: React.ReactNode}) {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            { children }
        </ThemeContext.Provider>
    );
}

export function useTheme(){
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeContextProvider");
    }
    return context;
}
