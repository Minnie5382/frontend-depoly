import React from 'react';
import style from './MovieDetail.module.css';

const MoviePoster = ({ src, alt }) => {
  return (
    <div className={style.posterContainer}>
      <img src={src} alt={alt} className={style.poster} />
    </div>
  );
};

export default MoviePoster;
