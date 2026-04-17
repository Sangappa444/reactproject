// ==========================================
// Navbar Component
// ==========================================
// The top navigation bar. Demonstrates:
// - useState for scroll state & mobile menu toggle
// - useEffect for scroll event listener
// - useTheme() context hook
// - NavLink from React Router (auto-applies "active" class)
// - CSS Modules for scoped styling

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Clapperboard, 
  Home, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  X, 
  Menu 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Listen for scroll events to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      id="main-navbar"
    >
      <div className={styles.navContent}>
        {/* Logo — Link takes you to home page */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Clapperboard size={28} className={styles.iconPrimary} />
          </span>
          CineVerse
        </Link>

        {/* Navigation Links */}
        <div className={`${styles.navLinks} ${mobileOpen ? styles.open : ''}`}>
          {/* NavLink auto-adds "active" class when route matches */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <Home size={18} /> Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <Heart size={18} /> Favorites
          </NavLink>

          {/* Search icon — navigates to search page */}
          <button
            className={styles.searchIcon}
            onClick={() => {
              navigate('/search');
              setMobileOpen(false);
            }}
            aria-label="Search movies"
            id="nav-search-btn"
          >
            <Search size={20} />
          </button>

          {/* Theme Toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile hamburger button */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
