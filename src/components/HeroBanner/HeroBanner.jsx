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
import { Film, Flame, Star, Play, Search } from 'lucide-react';
import { getBackdropUrl, getImageUrl } from '../../services/tmdb';
import styles from './HeroBanner.module.css';

export default function HeroBanner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
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

  // Use w1280 on mobile instead of original to save bandwidth
  const getResponsiveBackdrop = (path) => {
    if (!path) return null;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return isMobile ? getImageUrl(path, 'w1280') : getBackdropUrl(path);
  };

  const handleImgError = (movieId) => {
    setImgErrors((prev) => ({ ...prev, [movieId]: true }));
  };

  return (
    <div className={styles.hero} id="hero-banner">
      {/* Render all slides, only the active one has opacity: 1 */}
      {bannerMovies.map((movie, index) => {
        const backdropUrl = getResponsiveBackdrop(movie.backdrop_path);
        const hasError = imgErrors[movie.id];

        return (
          <div
            key={movie.id}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          >
            {backdropUrl && !hasError ? (
              <img
                src={backdropUrl}
                alt={movie.title}
                className={styles.backdrop}
                onError={() => handleImgError(movie.id)}
              />
            ) : (
              <div className={styles.noBackdrop}>
                <Film size={64} strokeWidth={1} />
              </div>
            )}
          </div>
        );
      })}

      {/* Gradient overlays for readability */}
      <div className={styles.gradient} />
      <div className={styles.gradientSide} />

      {/* Movie Info */}
      <div className={styles.content} key={currentMovie.id}>
        <span className={styles.tag}>
          <Flame size={16} fill="currentColor" /> Trending Now
        </span>

        <div className={styles.heroRating}>
          <Star size={18} fill="currentColor" color="var(--gold)" />
          <span className={styles.ratingValue}>{currentMovie.vote_average?.toFixed(1)}</span>
          <span>/ 10</span>
        </div>

        <h1 className={styles.title}>{currentMovie.title}</h1>
        <p className={styles.overview}>{currentMovie.overview}</p>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate(`/movie/${currentMovie.id}`)}
          >
            <Play size={18} fill="currentColor" /> View Details
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => navigate('/search')}
          >
            <Search size={18} /> Search Movies
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

