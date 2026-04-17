// ==========================================
// MovieGrid Component
// ==========================================
// Renders a grid (or horizontal scroll row) of MovieCards.
// Demonstrates:
// - Mapping over arrays to render lists
// - Conditional rendering (grid vs scroll, loading, empty)
// - Props: movies, title, layout, pagination
// - "key" prop: React needs a unique key for each list item
//   so it can efficiently update only changed items

import { Film, ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';
import styles from './MovieGrid.module.css';

export default function MovieGrid({
  title,
  movies,
  loading,
  layout = 'grid', // 'grid' or 'scroll'
  page,
  totalPages,
  onPageChange,
  isFavorite,
  onToggleFavorite,
}) {
  if (loading) {
    return (
      <section className={styles.section}>
        {title && <h2 className="section-title">{title}</h2>}
        <Loader count={8} />
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <section className={styles.section}>
        {title && <h2 className="section-title">{title}</h2>}
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <Film size={48} strokeWidth={1.5} />
          </div>
          <p className={styles.emptyText}>No movies found</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      {title && <h2 className="section-title">{title}</h2>}

      {/* grid or horizontal scroll row */}
      <div className={`${layout === 'scroll' ? styles.scrollRow : styles.grid} stagger`}>
        {movies.map((movie) => (
          // KEY is required! React uses it to track which items changed
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite ? isFavorite(movie.id) : false}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Pagination (only if onPageChange is provided) */}
      {onPageChange && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <span className={styles.pageInfo}>
            Page {page} of {Math.min(totalPages, 500)}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= Math.min(totalPages, 500)}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
