"use client";
import React, { useEffect, useState } from "react";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Define a TypeScript interface for the movie object
interface Movie {
  type: string;
  name: string;
  year: string;
  runtime: number;
  imageUrl: string;
}

const MoviePage = () => {
  const getMovie = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>Check the console for movie data</h1>
    </div>
  );
};

export default MoviePage;
