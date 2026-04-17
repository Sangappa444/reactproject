// ==========================================
// Home Page
// ==========================================
// The main landing page. Demonstrates:
// - Using multiple custom hooks in one component
// - Composing components together
// - Conditional rendering (demo mode banner)
// - Page structure: Hero + multiple MovieGrid sections

import { useState } from 'react';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { useTrending, usePopular, useTopRated } from '../../hooks/useMovies';
import { useFavorites } from '../../hooks/useFavorites';
import { isDemoMode } from '../../services/tmdb';
import styles from './Home.module.css';

export default function Home() {
  // Each hook independently fetches its own data
  const { data: trending, loading: trendingLoading } = useTrending();
  const [popularPage, setPopularPage] = useState(1);
  const { data: popular, loading: popularLoading } = usePopular(popularPage);
  const { data: topRated, loading: topRatedLoading } = useTopRated();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className={styles.homePage} id="home-page">
      {/* Hero Banner with trending movies */}
      <HeroBanner movies={trending} loading={trendingLoading} />

      <div className={styles.sections}>
        {/* Demo mode notice */}
        {isDemoMode && (
          <div className={styles.demoBanner}>
            <span className={styles.demoIcon}>ℹ️</span>
            <div>
              <strong>Demo Mode</strong> — You're seeing placeholder data. Add your free TMDB API key
              in <code>.env</code> to see real movies!{' '}
              <a
                href="https://www.themoviedb.org/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.demoLink}
              >
                Get a free key →
              </a>
            </div>
          </div>
        )}

        {/* Trending — horizontal scroll layout */}
        <MovieGrid
          title="🔥 Trending This Week"
          movies={trending}
          loading={trendingLoading}
          layout="scroll"
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        {/* Popular — grid with pagination */}
        <MovieGrid
          title="🎬 Popular Movies"
          movies={popular?.results}
          loading={popularLoading}
          page={popularPage}
          totalPages={popular?.totalPages}
          onPageChange={setPopularPage}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        {/* Top Rated — grid */}
        <MovieGrid
          title="⭐ Top Rated"
          movies={topRated?.results}
          loading={topRatedLoading}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}
