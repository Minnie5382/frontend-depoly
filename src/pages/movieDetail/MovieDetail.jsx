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

  const movie = movieData?.data.result;

  if (isLoading) <span>로딩 중..</span>;

  return (
    <div className={style.container}>
      <div className={style.mainContainer}>
        <div className={style.movieContent}>
          <MoviePoster movie={movie?.movie} />
          <div className={style.rightContainer}>
            <MovieInfo movie={movie} refetch={refetch} />
            <MovieRatings movie={movie} />
          </div>
        </div>
        <MovieReviewContainer movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieDetail;
