import React, { useState } from 'react';
import style from './Main.module.css';
import logo from '../../assets/logo.png';

const MainMovie = ({
  type,
  rank,
  title,
  releaseDate,
  poster,
  levelAvgScore,
  cinephileAvgScore,
}) => {
  return (
    <div className={style.moviePoster}>
      <img src={`${poster}`} />
      <span>{rank}</span>
      <label>{title}</label>
      {type === '출시 예정작' ? (
        <></>
      ) : (
        <span className={style.stars}>
          ⭐️ {levelAvgScore}
          <br />
          ⭐️ {cinephileAvgScore}
        </span>
      )}
      <div>{releaseDate}</div>
    </div>
  );
};

export default MainMovie;
