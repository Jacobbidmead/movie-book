"use client";

import React, { useState } from "react";
import Search from "../components/search";
import { useFetchMovies } from "../hooks/useFetchMovies";

interface savedMovies {
  saveMovie: string;
}

interface Movie {
  original_title: string;
  release_date: string;
  vote_average: string;
  id: string;
  poster_path: string;
}

const MoviePage: React.FC = () => {
  const [savedMovie, setSavedMovie] = useState<Movie[]>([]);

  const addMovie = (movieToSave: Movie) => {
    setSavedMovie((prevSavedMovies) => {
      // Check if the movie already exists in the saved list
      const isMovieSaved = prevSavedMovies.some(
        (movie) => movie.id === movieToSave.id
      );
      if (!isMovieSaved) {
        return [...prevSavedMovies, movieToSave]; // Add new movie
      }
      return prevSavedMovies; // Return existing list if movie is already saved
    });
  };

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
          <button onClick={() => addMovie(movie)}>Save</button>
        </div>
      ))}

      <div></div>
    </div>
  );
};

export default MoviePage;
