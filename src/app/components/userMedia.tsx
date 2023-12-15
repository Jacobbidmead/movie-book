"use client";

import { Movie } from "../types/interfaces";

interface UserMediaProps {
  savedMovies: Movie[];
}

const UserMedia: React.FC<UserMediaProps> = ({ savedMovies }) => {
  return (
    <>
      {" "}
      {savedMovies.map((savedMovie) => (
        <div key={savedMovie.id}>
          {" "}
          <h2>{savedMovie.original_title}</h2>
          <p>Release Date: {savedMovie.release_date}</p>
          <p>Rating: {savedMovie.vote_average}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${savedMovie.poster_path}`}
            alt={savedMovie.original_title}
          />
        </div>
      ))}
    </>
  );
};

export default UserMedia;
