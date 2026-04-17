// ==========================================
// useFavorites — Custom Hook for Favorites
// ==========================================
// Manages a list of favorite movies stored in localStorage.
// Any component that calls useFavorites() gets:
// - favorites: array of saved movies
// - addFavorite(movie): saves a movie
// - removeFavorite(movieId): removes a movie
// - isFavorite(movieId): checks if a movie is saved
//
// localStorage keeps data even after browser is closed!

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'cineverse-favorites';

// Helper: read favorites from localStorage
const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper: save favorites to localStorage
const saveFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export function useFavorites() {
  // Initialize state from localStorage (runs only once due to lazy initializer)
  const [favorites, setFavorites] = useState(loadFavorites);

  const addFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      // Don't add duplicates
      if (prev.some((m) => m.id === movie.id)) return prev;
      const updated = [...prev, movie];
      saveFavorites(updated);
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => {
      const updated = prev.filter((m) => m.id !== movieId);
      saveFavorites(updated);
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (movieId) => {
      return favorites.some((m) => m.id === movieId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
