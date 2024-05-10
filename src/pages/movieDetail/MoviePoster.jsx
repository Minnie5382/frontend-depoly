import React from 'react';
import style from './MovieDetail.module.css';

const MoviePoster = ({ movie }) => {
  return (
    <div className={style.posterContainer}>
      <img
        src={movie?.poster}
        alt={`${movie?.movieTitle} 포스터`}
        className={style.poster}
      />
    </div>
  );
};

export default MoviePoster;
