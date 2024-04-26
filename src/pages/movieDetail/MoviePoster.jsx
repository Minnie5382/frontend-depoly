import React from 'react';
import style from './MovieDetail.module.css';

const MoviePoster = ({ poster, movieTitle }) => {
  return (
    <div className={style.posterContainer}>
      <img src={poster} alt={`${movieTitle} 포스터`} className={style.poster} />
    </div>
  );
};

export default MoviePoster;
