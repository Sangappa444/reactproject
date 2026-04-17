// ==========================================
// main.jsx — Application Entry Point
// ==========================================
// This is where React "boots up":
// 1. Finds the <div id="root"> in index.html
// 2. Creates a React root inside it
// 3. Renders the App component
//
// StrictMode is a development helper that:
// - Catches common mistakes (like missing cleanup in useEffect)
// - Renders components TWICE in dev mode to detect side effects
// - Has NO effect in production builds

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css'; // Global styles — imported here, applied everywhere

// Find the root div and mount React into it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ThemeProvider wraps App so EVERY component can use useTheme() */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
