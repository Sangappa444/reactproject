// ==========================================
// useMovies — Custom Hook for Movie Data
// ==========================================
// Rewritten with individual hooks to avoid the spread-args
// dependency array issue that caused infinite re-renders.

import { useState, useEffect, useCallback } from 'react';
import {
  getTrending,
  getPopular,
  getTopRated,
  getNowPlaying,
  searchMovies,
  getMovieDetails,
} from '../services/tmdb';

// ---- Individual hooks (no generic wrapper) ----

export function useTrending() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getTrending();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function usePopular(page) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPopular(page);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [page]);

  return { data, loading, error };
}

export function useTopRated(page) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getTopRated(page);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [page]);

  return { data, loading, error };
}

export function useNowPlaying() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getNowPlaying();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useSearch(query, page = 1) {
  const [results, setResults] = useState({ results: [], totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async () => {
    if (!query || !query.trim()) {
      setResults({ results: [], totalPages: 0 });
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query, page);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    const timer = setTimeout(search, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return { ...results, loading, error };
}

export function useMovieDetail(movieId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getMovieDetails(movieId);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [movieId]);

  return { data, loading, error };
}
