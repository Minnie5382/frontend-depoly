import React from 'react';
import style from '../../UserInfoPage.module.css';
import { Link } from 'react-router-dom';

const ScrapCard = ({ poster, title, movieId, releaseDate }) => {
  return (
    <div className={style.scrap}>
      <Link to={`/movies/${movieId}`}>
        <img src={poster} alt={title} />
      </Link>
      <div className={style.movieInfo}>
        <Link to={`/movies/${movieId}`}>
          <span title={`${title} (${releaseDate})`}>{title}</span>
        </Link>
      </div>
    </div>
  );
};

export default ScrapCard;
