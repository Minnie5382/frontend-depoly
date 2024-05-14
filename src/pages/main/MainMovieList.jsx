import React, { useEffect, useState, useRef } from 'react';
import style from './Main.module.css';
import MainMovie from './MainMovie';
import { useQuery } from 'react-query';
import { useHorizontalScroll } from '../../utils/useSideScroll';

const MainMovieList = ({ title, querykey, apiName, setGenre }) => {
  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery(querykey, apiName, {
    refetchOnWindowFocus: false,
  });

  if (setGenre) {
    setGenre(movieData?.data.result.genre);
  }
  const sliderRef = useHorizontalScroll();

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - 400,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={style.movieContainer}>
      <h2>{title}</h2>
      <div className={style.movieBox}>
        <button className={style.moveLeftBtn} onClick={scrollLeft}>
          〈
        </button>
        <div className={style.movieContainerInner} ref={sliderRef}>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>isError...</div>
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
        <button className={style.moveRightBtn} onClick={scrollRight}>
          〉
        </button>
      </div>
    </div>
  );
};

export default MainMovieList;
