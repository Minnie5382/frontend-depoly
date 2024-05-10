import React, { useEffect, useState } from 'react';
import style from './Main.module.css';
import {
  getDailyBoxOffice,
  getUpcomingMovies,
  getMoviesByGenre,
} from '../../utils/movie';
import MainMovie from './MainMovie';
import { useQuery } from 'react-query';
import axios from 'axios';

const MainMovieList = ({ title, querykey, apiName, setGenre }) => {
  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery(querykey, apiName, {
    refetchOnWindowFocus: false,
  });
  console.log('dda', movieData);
  if (setGenre) {
    setGenre(movieData?.data.result.genre);
  }

  if (isError) {
    return (
      <div className={style.movieContainer}>
        <h2>{title}</h2>
        <div className={style.movieBox}>
          <button className={style.moveLeftBtn}>〈</button>
          <div className={style.movieContainerInner}>
            {' '}
            <div>isError...</div>
          </div>
          <button className={style.moveRightBtn}>〉</button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.movieContainer}>
      <h2>{title}</h2>
      <div className={style.movieBox}>
        <button className={style.moveLeftBtn}>〈</button>
        <div className={style.movieContainerInner}>
          {isLoading ? (
            <div>Loading...</div>
          ) : querykey !== 'genre' ? (
            movieData?.data.result.map((data, index) => (
              <MainMovie key={index} {...data} type={title} />
            ))
          ) : (
            movieData?.data.result.movieList.map((data, index) => (
              <MainMovie key={index} {...data} type={title} />
            ))
          )}
        </div>
        <button className={style.moveRightBtn}>〉</button>
      </div>
    </div>
  );
};

export default MainMovieList;
