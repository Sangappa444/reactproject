// ==========================================
// SearchBar Component
// ==========================================
// Controlled input: React manages the input value via state.
// Demonstrates:
// - Controlled component pattern (value + onChange)
// - Props: value/onChange from parent (lifting state up)
// - Ref: useRef to auto-focus the input on mount

import { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
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
        <span className={styles.searchIconLabel}>
          <Search size={20} />
        </span>
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
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
