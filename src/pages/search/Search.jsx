import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSearchMovies } from '../../utils/useSearchMovies';
import Header from '../../components/header/Header';
import style from './Search.module.css';
import MoviesList from './MoviesList';
import ChatroomsList from './ChatroomsList';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery().get('query');
  console.log(query);
  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useSearchMovies(query);

  if (isLoadingMovies) return <div>로딩중...</div>;
  if (errorMovies) return <div>{errorMovies.message}</div>;

  return (
    <div>
      <Header />
      <div className={style.container}>
        <MoviesList movies={moviesData} query={query} />
        {/* <ChatroomsList chatrooms={chatroomsData} /> */}
      </div>
    </div>
  );
};

export default Search;
