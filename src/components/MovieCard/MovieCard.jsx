// ==========================================
// MovieCard Component
// ==========================================
// A single movie poster card. Demonstrates:
// - Props: receives movie data from parent
// - Conditional rendering: poster vs placeholder
// - Event handling: click to navigate, click heart to favorite
// - CSS Modules: styles.card, styles.poster, etc.
// - useNavigate: programmatic navigation to detail page

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Film } from 'lucide-react';
import { getPosterUrl } from '../../services/tmdb';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    overview,
  } = movie;

  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const posterUrl = getPosterUrl(poster_path);

  const ratingClass =
    vote_average >= 7.5
      ? styles.ratingHigh
      : vote_average >= 5
      ? styles.ratingMed
      : styles.ratingLow;

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/movie/${id}`)}
      role="button"
      tabIndex={0}
      id={`movie-card-${id}`}
    >
      {/* Poster Image */}
      <div className={styles.posterWrap}>
        {posterUrl && !imgError ? (
          <img
            src={posterUrl}
            alt={title}
            className={styles.poster}
            onError={() => setImgError(true)}
            loading="lazy"

          />
        ) : (
          <div className={styles.noPoster}>
            <Film size={48} strokeWidth={1.5} />
          </div>
        )}

        {/* Rating Badge */}
        <div className={`${styles.rating} ${ratingClass}`}>
          <Star size={14} fill="currentColor" /> {rating}
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(movie);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <Heart size={20} fill="currentColor" />
            ) : (
              <Heart size={20} />
            )}
          </button>
        )}

        {/* Hover Overlay with Overview */}
        <div className={styles.overlay}>
          <p className={styles.overlayText}>{overview}</p>
        </div>
      </div>

      {/* Card Info */}
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
        </div>
      </div>
    </div>
  );
}
