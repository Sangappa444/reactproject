// ==========================================
// MovieDetail Page
// ==========================================
// Full movie details page. Demonstrates:
// - useParams: extracts the :id from the URL (/movie/123 → id = "123")
// - useNavigate: go back button
// - Complex data rendering: genres, cast, trailer, similar movies
// - Scroll to top on navigate

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Star, 
  Heart, 
  HeartOff, 
  Film 
} from 'lucide-react';
import { useMovieDetail } from '../../hooks/useMovies';
import { useFavorites } from '../../hooks/useFavorites';
import { getBackdropUrl, getPosterUrl } from '../../services/tmdb';
import CastCard from '../../components/CastCard/CastCard';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetail.module.css';

export default function MovieDetail() {
  // useParams grabs the :id from the route /movie/:id
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch full movie details
  const { data: movie, loading } = useMovieDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingTop: 'calc(var(--navbar-height) + 40px)' }}>
        <Loader text="Loading movie details..." />
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ paddingTop: 'calc(var(--navbar-height) + 40px)', textAlign: 'center' }}>
        <h2>Movie not found</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '';
  const cast = movie.credits?.cast?.slice(0, 15) || [];
  const trailer = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const similar = movie.similar?.results?.slice(0, 8) || [];

  return (
    <div className={styles.detailPage} id="movie-detail-page">
      {/* Backdrop */}
      <div className={styles.backdropSection}>
        {backdropUrl ? (
          <img 
            src={backdropUrl} 
            alt={movie.title} 
            className={styles.backdropImg} 
          />
        ) : (
          <div className={styles.noBackdrop}>
            <Film size={64} strokeWidth={1} />
          </div>
        )}
        <div className={styles.backdropGradient} />
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          {/* Poster */}
          <div className={styles.posterWrap}>
            {posterUrl ? (
              <img 
                src={posterUrl} 
                alt={movie.title} 
                className={styles.poster} 
              />
            ) : (
              <div className={styles.noPosterDetail}>
                <Film size={80} strokeWidth={1} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className={styles.details}>
            {movie.tagline && <p className={styles.tagline}>"{movie.tagline}"</p>}

            <h1 className={styles.title}>{movie.title}</h1>

            {/* Meta row: year, runtime, rating */}
            <div className={styles.metaRow}>
              {year && (
                <span className={styles.metaItem}>
                  <Calendar size={16} /> {year}
                </span>
              )}
              {runtime && (
                <span className={styles.metaItem}>
                  <Clock size={16} /> {runtime}
                </span>
              )}
              {movie.vote_average > 0 && (
                <span className={styles.ratingBadge}>
                  <Star size={16} fill="currentColor" /> {movie.vote_average.toFixed(1)} / 10
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres && (
              <div className={styles.genres}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className={styles.overview}>{movie.overview}</p>

            {/* Favorite button */}
            <div className={styles.actionBtns}>
              <button
                className={`${styles.favBtn} ${
                  isFavorite(movie.id) ? styles.favBtnRemove : styles.favBtnAdd
                }`}
                onClick={() =>
                  toggleFavorite({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                    overview: movie.overview,
                  })
                }
                id="fav-toggle-btn"
              >
                {isFavorite(movie.id) ? (
                  <>
                    <HeartOff size={18} /> Remove from Favorites
                  </>
                ) : (
                  <>
                    <Heart size={18} fill="currentColor" /> Add to Favorites
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <div>
            <h2 className={styles.sectionTitle}>Top Cast</h2>
            <div className={styles.castRow}>
              {cast.map((actor) => (
                <CastCard key={actor.id} actor={actor} />
              ))}
            </div>
          </div>
        )}

        {/* Trailer Section */}
        {trailer && (
          <div className={styles.trailerSection}>
            <h2 className={styles.sectionTitle}>Trailer</h2>
            <div className={styles.trailerWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className={styles.similarSection}>
            <MovieGrid
              title="Similar Movies"
              movies={similar}
              layout="scroll"
            />
          </div>
        )}
      </div>
    </div>
  );
}
