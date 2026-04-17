// ==========================================
// TMDB API Service Layer
// ==========================================
// This file centralizes ALL communication with The Movie Database API.
// Why? So components never talk to the API directly — they go through here.
// If the API changes, we only update THIS file, not every component.

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
// Try using 'media.themoviedb.org' instead of 'image.tmdb.org' to bypass some mobile ISP blocks (like Jio in India)
const IMG_BASE = 'https://media.themoviedb.org/t/p';

// ---- Image URL Helpers ----
// TMDB returns image "paths" like "/abc123.jpg"
// We need to prepend the base URL + size to make a full URL
// Use w342 on mobile for faster loading, w500 on desktop
export const getPosterUrl = (path) => {
  if (!path) return null;
  // Use a safer check for mobile that doesn't rely solely on window width at call time
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const size = isMobile ? 'w342' : 'w500';
  return `${IMG_BASE}/${size}${path}`;
};
export const getImageUrl = (path, size = 'original') => {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path) => {
  if (!path) return null;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const size = isMobile ? 'w780' : 'original';
  return `${IMG_BASE}/${size}${path}`;
};

export const getProfileUrl = (path) => getImageUrl(path, 'w185');

// ---- Demo / Fallback Data ----
// Used when no API key is configured so the app still looks great
const DEMO_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.4,
    release_date: '2010-07-16',
    genre_ids: [28, 878, 12],
  },
  {
    id: 2,
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological and physical tests.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 9.0,
    release_date: '2008-07-18',
    genre_ids: [28, 80, 18],
  },
  {
    id: 3,
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.6,
    release_date: '2014-11-07',
    genre_ids: [12, 18, 878],
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.5,
    release_date: '1994-10-14',
    genre_ids: [53, 80],
  },
  {
    id: 5,
    title: 'The Matrix',
    overview: 'A computer programmer discovers that reality as he knows it is a simulation created by machines.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.2,
    release_date: '1999-03-31',
    genre_ids: [28, 878],
  },
  {
    id: 6,
    title: 'Fight Club',
    overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.4,
    release_date: '1999-10-15',
    genre_ids: [18],
  },
  {
    id: 7,
    title: 'Forrest Gump',
    overview: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold from the perspective of an Alabama man.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.5,
    release_date: '1994-07-06',
    genre_ids: [35, 18, 10749],
  },
  {
    id: 8,
    title: 'The Shawshank Redemption',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster_path: null,
    backdrop_path: null,
    vote_average: 9.3,
    release_date: '1994-09-23',
    genre_ids: [18, 80],
  },
];

const isDemo = !API_KEY || API_KEY === 'demo';

// ---- Generic Fetch Helper ----
// Every API call goes through this. It handles:
// 1. Building the full URL with API key
// 2. Error handling
// 3. Falling back to demo data if no key
const fetchFromTMDB = async (endpoint, params = {}) => {
  if (isDemo) return null; // Will trigger demo fallback in callers

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  // Append any extra params (like page, query, etc.)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`TMDB API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('TMDB fetch error:', error);
    throw error;
  }
};

// ---- API Functions ----
// Each function fetches a specific type of data.
// They all return the same shape: { results: [...movies] }

export const getTrending = async () => {
  const data = await fetchFromTMDB('/trending/movie/week');
  return data?.results || DEMO_MOVIES;
};

export const getPopular = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/popular', { page });
  return {
    results: data?.results || DEMO_MOVIES,
    totalPages: data?.total_pages || 1,
  };
};

export const getTopRated = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/top_rated', { page });
  return {
    results: data?.results || DEMO_MOVIES.slice(0, 4),
    totalPages: data?.total_pages || 1,
  };
};

export const getNowPlaying = async () => {
  const data = await fetchFromTMDB('/movie/now_playing');
  return data?.results || DEMO_MOVIES;
};

export const searchMovies = async (query, page = 1) => {
  if (!query.trim()) return { results: [], totalPages: 0 };
  const data = await fetchFromTMDB('/search/movie', { query, page });
  return {
    results: data?.results || [],
    totalPages: data?.total_pages || 0,
  };
};

export const getMovieDetails = async (movieId) => {
  const data = await fetchFromTMDB(`/movie/${movieId}`, {
    append_to_response: 'credits,videos,similar',
  });

  if (!data) {
    // Demo fallback for detail page
    const demoMovie = DEMO_MOVIES.find((m) => m.id === Number(movieId));
    return {
      ...(demoMovie || DEMO_MOVIES[0]),
      runtime: 148,
      genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Sci-Fi' }],
      tagline: 'Your mind is the scene of the crime.',
      credits: { cast: [] },
      videos: { results: [] },
      similar: { results: DEMO_MOVIES.slice(0, 4) },
    };
  }

  return data;
};

export const getGenres = async () => {
  const data = await fetchFromTMDB('/genre/movie/list');
  return data?.genres || [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' },
    { id: 80, name: 'Crime' },
    { id: 10749, name: 'Romance' },
  ];
};

// Export demo status for UI messages
export const isDemoMode = isDemo;
