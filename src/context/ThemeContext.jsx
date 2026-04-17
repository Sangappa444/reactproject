// ==========================================
// Theme Context — Dark/Light Mode
// ==========================================
// WHY useContext?
// Without context, you'd have to pass "theme" as a prop through
// EVERY component in the tree (called "prop drilling"). Context
// lets ANY component access the theme directly.
//
// HOW IT WORKS:
// 1. createContext() creates a "mailbox" that components can read from
// 2. ThemeProvider wraps the app and "puts mail" (theme value) in the mailbox
// 3. Any component calls useTheme() to "check the mailbox"

import { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the Context (the "mailbox")
const ThemeContext = createContext();

// Step 2: Create the Provider (wraps the app, provides the value)
export function ThemeProvider({ children }) {
  // Initialize theme from localStorage (so it persists across refreshes)
  // If nothing saved, default to 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('cineverse-theme');
    return saved || 'dark';
  });

  // useEffect runs AFTER the component renders
  // Here: whenever theme changes, update localStorage + the <html> element
  useEffect(() => {
    localStorage.setItem('cineverse-theme', theme);
    // Set data-theme attribute on <html> so CSS can react to it
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]); // <-- [theme] = "only re-run when theme changes"

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // The value prop is what components receive when they use useTheme()
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Custom hook for easy access
// Instead of: const { theme } = useContext(ThemeContext)
// Components do: const { theme } = useTheme()
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
