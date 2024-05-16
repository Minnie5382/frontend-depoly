import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { searchMovies } from '../../utils/movie';
import style from './Search.module.css';
import MoviesList from './MoviesList';
import ChatroomsList from './ChatroomsList';

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const navigate = useNavigate();
  const query = useQueryParams().get('query');

  useEffect(() => {
    if (!query) {
      navigate('/');
      alert('검색어를 입력해주세요!');
    }
  }, [query, navigate]);

  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useQuery(['searchMovies', query], () => searchMovies(query), {
    enabled: !!query,
  });

  return (
    <div>
      <div className={style.container}>
        <MoviesList
          movies={moviesData?.data.result}
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
