import React, { useEffect } from 'react';
import style from './Main.module.css';
import MainMovie from './MainMovie';
import { useQuery } from 'react-query';
import { useHorizontalScroll } from '../../utils/useSideScroll';

const MainMovieList = ({ title, queryKey, apiName, setGenre }) => {
  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery(queryKey, apiName, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });

  const result = movieData?.data?.result;

  useEffect(() => {
    if (setGenre && result?.genre) {
      setGenre(result.genre);
    }
  }, [result?.genre, setGenre]);

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

  const movies = Array.isArray(result) ? result : result?.movieList;

  if (!movies || movies.length === 0) {
    return null;
  }

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
          ) : (
            movies?.map((data, index) => (
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
