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

const genres = [
  '액션',
  '모험',
  '애니메이션',
  '코미디',
  '범죄',
  '다큐멘터리',
  '드라마',
  '가족',
  '판타지',
  '역사',
  '공포',
  '음악',
  '미스터리',
  '로맨스',
  'SF',
  'TV 영화',
  '스릴러',
  '전쟁',
  '서부',
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledGenres = shuffleArray([...genres]);

const Main = () => {
  const [genreMovies, setGenreMovies] = useState([]);

  const fetchMoviesByGenre = async ({ pageParam = 0 }) => {
    const genre = shuffledGenres[pageParam];
    if (!genre) return null;

    const response = await getMoviesByGenre(genre);

    return { genre, movies: response.data.result.movieList };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery('genreMovies', fetchMoviesByGenre, {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < shuffledGenres.length) {
          return pages.length;
        }
        return undefined;
      },
    });

  useEffect(() => {
    if (data) {
      const uniqueGenreMovies = Array.from(
        new Map(data.pages.map((page) => [page.genre, page])).values()
      );
      setGenreMovies(uniqueGenreMovies);
    }
  }, [data]);

  const ref = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

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
      {genreMovies.map((genreData, index) => (
        <MainMovieList
          key={index}
          title={genreData.genre}
          queryKey={`genre-${index}`}
          apiName={() =>
            Promise.resolve({ data: { result: genreData.movies } })
          }
        />
      ))}
      {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
    </div>
  );
};

export default Main;
