// ==========================================
// Favorites Page
// ==========================================
// Shows saved movies from localStorage.
// Demonstrates:
// - useFavorites hook for reading + removing favorites
// - Conditional rendering: empty state vs grid
// - Link component for navigation

import { Link } from 'react-router-dom';
import { Heart, HeartOff, Film } from 'lucide-react';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './Favorites.module.css';

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className={styles.favPage} id="favorites-page">
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Heart size={32} fill="var(--accent)" color="var(--accent)" /> My Favorites
        </h1>
        <p className={styles.subtitle}>
          <span className={styles.count}>{favorites.length}</span> movie{favorites.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <HeartOff size={64} strokeWidth={1} />
          </div>
          <h2 className={styles.emptyTitle}>No favorites yet</h2>
          <p className={styles.emptyText}>
            Start exploring movies and tap the heart button to save your favorites here.
          </p>
          <Link to="/" className={styles.browseBtn}>
            <Film size={18} /> Browse Movies
          </Link>
        </div>
      ) : (
        <MovieGrid
          movies={favorites}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
