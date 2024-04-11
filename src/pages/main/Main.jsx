import React from 'react';
import style from './Main.module.css';
import Header from '../../components/header/Header';
import MainMovieList from './MainMovieList';
import MainHotReviewList from './MainHotReviewList';

const Main = () => {
  const BoxOfficeRanking = {
    poster: '',
    name: 'about time',
    make: '2013',
  };
  const ScheduledForRelease = {
    poster: '',
    name: 'about time',
    make: '2013',
  };
  const RomanticComedy = {
    poster: '',
    name: 'about time',
    make: '2013',
  };

  return (
    <div className={style.container}>
      <Header />
      <MainHotReviewList />
      <MainMovieList title="박스 오피스" />
      <MainMovieList title="출시 예정작" />
      <MainMovieList title="로맨틱 코미디" />
    </div>
  );
};

export default Main;
