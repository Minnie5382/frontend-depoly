import React from 'react';
import style from './Main.module.css';
import logo from '../../assets/logo.png';
import getDailyBoxOffice from '../../utils/movie';

const MainMovie = ({ rank, title, releaseDate }) => {
  return (
    <div className={style.moviePoster}>
      <img src={logo} />
      <span>{rank}</span>
      <label>
        {title}/{releaseDate}
      </label>
    </div>
  );
};

export default MainMovie;
