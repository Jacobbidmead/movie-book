"use client";

import React, { useEffect, useState, useCallback } from "react";
import Search from "../components/search";
import { useFetchMovies } from "../hooks/useFetchMovies";

const MoviePage = () => {
  const { movies, isLoading, error, fetchMovies } = useFetchMovies();
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
