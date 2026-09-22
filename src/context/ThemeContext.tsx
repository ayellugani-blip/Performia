import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'mix';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('performia_theme');
    if (saved === 'dark' || saved === 'mix' || saved === 'light') {
      return saved;
    }
    return 'light'; // default theme
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('performia_theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Toggle dark class for tailwind or custom styling
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('mix');
    } else if (theme === 'mix') {
      root.classList.add('mix');
      root.classList.remove('dark');
    } else {
      root.classList.remove('dark', 'mix');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
