// ==========================================
// SearchBar Component
// ==========================================
// Controlled input: React manages the input value via state.
// Demonstrates:
// - Controlled component pattern (value + onChange)
// - Props: value/onChange from parent (lifting state up)
// - Ref: useRef to auto-focus the input on mount

import { useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Search for movies...' }) {
  const inputRef = useRef(null);

  // Auto-focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <span className={styles.searchIconLabel}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="search-input"
          aria-label="Search movies"
        />
        {value && (
          <button
            className={styles.clearBtn}
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
