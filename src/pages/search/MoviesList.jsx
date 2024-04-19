import React from 'react';
import { Link } from 'react-router-dom';
import style from './Search.module.css';

const MoviesList = ({ movies, query }) => {
  return (
    <div>
      <h2>'{query}' 에 대한 검색 결과</h2>
      <div className={style.moviesContainer}>
        {movies?.results.map((movie) => (
          <Link
            to={`/movies/${movie.movieId}`}
            key={movie.id}
            className={style.movie}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={style.poster}
            />
            <div className={style.movieInfo} title={movie.title}>
              <span className={style.movieTitle}>{movie.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
