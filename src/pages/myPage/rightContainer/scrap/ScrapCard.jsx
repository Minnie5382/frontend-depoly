import React from 'react';
import style from '../../MyPage.module.css';

const ScrapCard = ({ poster, title, movieId, releaseDate }) => {
  return (
    <div className={style.scrap}>
      <img src={poster} alt={title} />
      <div className={style.movieInfo}>
        <span>{title} / </span>
        <span>{releaseDate}</span>
      </div>
    </div>
  );
};

export default ScrapCard;
