import React from 'react';
import { useParams } from 'react-router-dom';
import style from './MovieDetail.module.css';
import MoviePoster from './MoviePoster';
import MovieInfo from './MovieInfo';
import MovieRatings from './MovieRatings';
import MovieReviewContainer from './MovieReviewContainer';
import { useQuery } from 'react-query';
import { moviesDetail } from '../../utils/movie';

const MovieDetail = () => {
  const { movieId } = useParams();

  const {
    data: movieData,
    isLoading,
    refetch,
  } = useQuery(['movieDetail', movieId], () => moviesDetail(movieId), {
    keepPreviousData: true,
  });

  if (isLoading) <span>로딩 중..</span>;

  return (
    <div className={style.container}>
      <div className={style.mainContainer}>
        <div className={style.movieContent}>
          <MoviePoster movie={movieData?.data.result.movie} />
          <div className={style.rightContainer}>
            <MovieInfo movie={movieData?.data.result} refetch={refetch} />
            <MovieRatings movie={movieData?.data.result} />
          </div>
        </div>
        <MovieReviewContainer movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieDetail;
