"use client";

import React, { useEffect, useState, useCallback } from "react";
import Search from "../components/search";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface Movie {
  original_title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = (query: string = "") => {
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
  };
  return (
    <div>
      <Search onSearch={fetchMovies} />

      {movies.map((movie, i) => (
        <div key={i}>
          <h2>{movie.original_title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviePage;
