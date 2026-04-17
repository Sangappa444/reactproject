// ==========================================
// Search Page
// ==========================================
// Demonstrates:
// - Lifting state up: SearchBar's value is managed HERE (parent)
//   and passed DOWN as props. This is called "controlled components".
// - useSearch hook with debounce: auto-searches 500ms after typing
// - Conditional rendering for different states (empty, no results, results)

import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { useSearch } from '../../hooks/useMovies';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './Search.module.css';

export default function Search() {
  // State "lives" here and is passed down to SearchBar
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // Custom hook handles debounced API calls
  const { results, totalPages, loading, error } = useSearch(query, page);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Reset to page 1 when query changes
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div className={styles.searchPage} id="search-page">
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Search Movies</h1>
        <p className={styles.subtitle}>Find any movie from over 800,000 titles</p>
      </div>

      {/* Search Input */}
      <div className={styles.searchBarWrap}>
        <SearchBar value={query} onChange={handleQueryChange} />
      </div>

      {/* Results */}
      {error && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⚠️</div>
          <h3 className={styles.emptyTitle}>Something went wrong</h3>
          <p className={styles.emptyText}>{error}</p>
        </div>
      )}

      {query && !loading && results.length > 0 && (
        <p className={styles.resultInfo}>
          Showing results for <span className={styles.resultQuery}>"{query}"</span>
        </p>
      )}

      {query && !loading && results.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No results found</h3>
          <p className={styles.emptyText}>Try searching for something else</p>
        </div>
      )}

      {!query && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h3 className={styles.emptyTitle}>Start typing to search</h3>
          <p className={styles.emptyText}>Search by movie title</p>
        </div>
      )}

      {(query || loading) && (
        <MovieGrid
          movies={results}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
