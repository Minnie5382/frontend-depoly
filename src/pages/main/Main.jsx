import React, { useState } from 'react';
import style from './Main.module.css';
import MainMovieList from './MainMovieList';
import MainHotReviewList from './MainHotReviewList';
import {
  getDailyBoxOffice,
  getUpcomingMovies,
  getMoviesByGenre,
} from '../../utils/movie';

const Main = () => {
  const [genre, setGenre] = useState('장르별');
  return (
    <div className={style.container}>
      <MainHotReviewList />
      <MainMovieList
        title='박스 오피스'
        querykey='boxOffice'
        apiName={getDailyBoxOffice}
      />
      <MainMovieList
        title='출시 예정작'
        querykey='upComing'
        apiName={getUpcomingMovies}
      />
      <MainMovieList
        title={genre}
        setGenre={setGenre}
        querykey='genre'
        apiName={getMoviesByGenre}
      />
    </div>
  );
};

export default Main;
