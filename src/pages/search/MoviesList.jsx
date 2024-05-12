import React from 'react';
import { Link } from 'react-router-dom';
import style from './Search.module.css';

const MoviesList = ({ movies, query, isLoading, error }) => {
  return (
    <div>
      <h2>'{query}'에 대한 검색 결과</h2>
      <div className={style.moviesContainer}>
        {movies?.movieList?.length > 0 ? (
          movies.movieList.map((movie) => (
            <Link
              to={`/movies/${movie.movieId}`}
              key={movie.movieId}
              className={style.movie}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className={style.poster}
              />
              <div className={style.movieInfo} title={movie.title}>
                <span className={style.movieTitle}>{movie.title}</span>
              </div>
            </Link>
          ))
        ) : (
          <div>'{query}'로 검색한 영화가 존재하지 않습니다!</div>
        )}
      </div>
      {isLoading && <div className={style.statusMessage}>로딩중...</div>}
      {error && (
        <div className={style.statusMessage}>
          오류가 발생했습니다!: {error.message}
        </div>
      )}
    </div>
  );
};

export default MoviesList;
