// ==========================================
// HeroBanner Component
// ==========================================
// Auto-rotating full-screen backdrop of trending movies.
// Demonstrates:
// - useEffect with setInterval (auto-rotation timer)
// - Cleanup function to clear interval
// - Array index cycling
// - Conditional rendering with optional chaining (?.)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBackdropUrl } from '../../services/tmdb';
import styles from './HeroBanner.module.css';

export default function HeroBanner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Limit to first 5 movies for the banner
  const bannerMovies = movies?.slice(0, 5) || [];

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (bannerMovies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 6000);

    // CLEANUP: Clear interval when component unmounts
    // Without this, the interval keeps running even after navigating away!
    return () => clearInterval(interval);
  }, [bannerMovies.length]);

  if (!bannerMovies.length) return null;

  const currentMovie = bannerMovies[currentIndex];

  return (
    <div className={styles.hero} id="hero-banner">
      {/* Render all slides, only the active one has opacity: 1 */}
      {bannerMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
        >
          {getBackdropUrl(movie.backdrop_path) ? (
            <img
              src={getBackdropUrl(movie.backdrop_path)}
              alt={movie.title}
              className={styles.backdrop}
            />
          ) : (
            <div className={styles.noBackdrop}>🎬</div>
          )}
        </div>
      ))}

      {/* Gradient overlays for readability */}
      <div className={styles.gradient} />
      <div className={styles.gradientSide} />

      {/* Movie Info */}
      <div className={styles.content} key={currentMovie.id}>
        <span className={styles.tag}>🔥 Trending Now</span>

        <div className={styles.heroRating}>
          ⭐ <span className={styles.ratingValue}>{currentMovie.vote_average?.toFixed(1)}</span>
          <span>/ 10</span>
        </div>

        <h1 className={styles.title}>{currentMovie.title}</h1>
        <p className={styles.overview}>{currentMovie.overview}</p>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate(`/movie/${currentMovie.id}`)}
          >
            ▶ View Details
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => navigate('/search')}
          >
            🔍 Search Movies
          </button>
        </div>
      </div>

      {/* Navigation dots */}
      <div className={styles.dots}>
        {bannerMovies.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
