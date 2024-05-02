import React from 'react';
import style from './Main.module.css';
import Header from '../../components/header/Header';
import MainMovieList from './MainMovieList';
import MainHotReviewList from './MainHotReviewList';
import {
  getDailyBoxOffice,
  getUpcomingMovies,
  getMoviesByGenre,
} from '../../utils/movie';

const Main = () => {
  return (
    <div className={style.container}>
      <Header />
      <MainHotReviewList />
      <MainMovieList title="박스 오피스" apiName={getDailyBoxOffice} />
      <MainMovieList title="출시 예정작" apiName={getUpcomingMovies} />
      <MainMovieList title="로맨틱 코미디" apiName={getMoviesByGenre} />
    </div>
  );
};

export default Main;
