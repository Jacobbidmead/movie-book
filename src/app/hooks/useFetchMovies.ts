"use client";

import { useState, useCallback } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback((query = "") => {
    setIsLoading(true);
    setError(null);

    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { movies, isLoading, error, fetchMovies };
};
