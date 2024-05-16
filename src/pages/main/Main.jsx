import React, { useState, useEffect } from 'react';
import style from './Main.module.css';
import MainMovieList from './MainMovieList';
import MainHotReviewList from './MainHotReviewList';
import {
  getDailyBoxOffice,
  getUpcomingMovies,
  getMoviesByGenre,
} from '../../utils/movie';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import { useInfiniteQuery } from 'react-query';

const Main = () => {
  const [genreMovies, setGenreMovies] = useState([]);

  const fetchMoviesByGenre = async ({ pageParam = 0 }) => {
    const newMovies = await getMoviesByGenre();
    const newGenre = newMovies?.data?.result?.genre;

    if (!genreMovies.some((movie) => movie?.data?.result?.genre === newGenre)) {
      return newMovies;
    }
    return null;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery('genreMovies', fetchMoviesByGenre, {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < 19) {
          return pages.length;
        } else {
          return undefined;
        }
      },
    });

  const ref = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (data) {
      const allMovies = data?.pages?.flat().filter((page) => page !== null);
      setGenreMovies(allMovies);
    }
  }, [data]);

  return (
    <div className={style.container}>
      <MainHotReviewList />
      <MainMovieList
        title='박스 오피스'
        queryKey='boxOffice'
        apiName={getDailyBoxOffice}
      />
      <MainMovieList
        title='출시 예정작'
        queryKey='upComing'
        apiName={getUpcomingMovies}
      />
      {genreMovies.map((movies, index) => (
        <MainMovieList
          key={index}
          title={movies.data.result.genre}
          queryKey={`genre-${index}`}
          apiName={() => Promise.resolve(movies)}
        />
      ))}
      {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
    </div>
  );
};

export default Main;
