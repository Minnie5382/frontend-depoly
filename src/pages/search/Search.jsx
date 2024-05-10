import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { searchMovies } from '../../utils/movie';
import Header from '../../components/header/Header';
import style from './Search.module.css';
import MoviesList from './MoviesList';
import ChatroomsList from './ChatroomsList';

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQueryParams().get('query');

  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useQuery(['searchMovies', query], () => searchMovies(query), {
    enabled: !!query,
  });

  if (isLoadingMovies || !moviesData) {
    return <span>로딩 중... </span>;
  }

  if (errorMovies) {
    return <span>에러.. </span>;
  }

  return (
    <div>
      <Header />
      <div className={style.container}>
        <MoviesList
          movies={moviesData.data.result}
          query={query}
          isLoading={isLoadingMovies}
          error={errorMovies}
        />
        {/* <ChatroomsList
          chatrooms={chatroomsData}
          query={query}
          isLoading={isLoadingMovies}
          error={errorMovies}
        /> */}
      </div>
    </div>
  );
};

export default Search;
