import React from 'react';
import { Link } from 'react-router-dom';
import style from './Search.module.css';
import { useHorizontalScroll } from '../../utils/useSideScroll';

const MoviesList = ({ movies, query, isLoading }) => {
  const scrollRef = useHorizontalScroll();

  return (
    <div>
      <h2>'{query}'에 대한 검색 결과</h2>
      <div className={style.moviesContainer} ref={scrollRef}>
        {isLoading ? (
          <div className={style.statusMessage}>로딩중...</div>
        ) : movies?.length > 0 ? (
          movies.map((movie) => (
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
    </div>
  );
};

export default MoviesList;
