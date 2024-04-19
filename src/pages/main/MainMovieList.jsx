import React from 'react';
import style from './Main.module.css';
import logo from '../../assets/logo.png';

const MainMovieList = ({ title, movieName, year }) => {
  return (
    <div className={style.movieContainer}>
      <h2>{title}</h2>
      <div className={style.movieBox}>
        <button className={style.moveLeftBtn}>〈</button>
        <div className={style.movieContainerInner}>
          {/* map */}
          <div className={style.moviePoster}>
            <img src={logo} />
            <span>0</span>
            <label>
              {movieName}/{year}
            </label>
          </div>
          <div className={style.moviePoster}>
            <img src={logo} />
            <span>1</span>
            <label>sasa</label>
          </div>
          <div className={style.moviePoster}>
            <img src={logo} />
            <label>sasa</label>
          </div>
        </div>
        <button className={style.moveRightBtn}>〉</button>
      </div>
    </div>
  );
};

export default MainMovieList;
