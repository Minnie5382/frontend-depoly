import React from 'react';
import style from './Main.module.css';
import { Link } from 'react-router-dom';

const MainMovie = ({
  type,
  rank,
  title,
  releaseDate,
  poster,
  levelAvgScore,
  cinephileAvgScore,
  movieId,
}) => {
  return (
    <div className={style.moviePoster}>
      <Link to={`/movies/${movieId}`}>
        <img src={poster} alt={title} />
      </Link>
      <span>{rank}</span>
      <Link to={`/movies/${movieId}`}>
        <label title={title} className={style.movieTitle}>
          {title}
        </label>
      </Link>
      {type === '출시 예정작' ? (
        <></>
      ) : (
        <span className={style.stars}>
          {levelAvgScore && levelAvgScore !== 0.0 && (
            <div>⭐️ {levelAvgScore}</div>
          )}
          {cinephileAvgScore && cinephileAvgScore !== 0.0 && (
            <div>⭐️ {cinephileAvgScore}</div>
          )}
        </span>
      )}
      <div>{releaseDate}</div>
    </div>
  );
};

export default MainMovie;
