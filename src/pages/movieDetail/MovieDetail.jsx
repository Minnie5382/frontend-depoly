import React from 'react';
import { useParams } from 'react-router-dom';
import style from './MovieDetail.module.css';
import Header from '../../components/header/Header';
import MoviePoster from './MoviePoster';
import MovieInfo from './MovieInfo';
import MovieRatings from './MovieRatings';
import MovieReviewContainer from './MovieReviewContainer';
import { useQuery } from 'react-query';
import { moviesDetail } from '../../utils/movie';

const MovieDetail = () => {
  const { movieId } = useParams();

  const { data } = useQuery(
    ['movieDetail', movieId],
    () => moviesDetail(movieId),
    {
      keepPreviousData: true,
    }
  );

  const movieData = {
    crewList: [{ name: 'test', profile: '', job: '', character: '' }],
    poster: 'sf',
  };

  return (
    <div className={style.container}>
      <Header />
      <div className={style.mainContainer}>
        <div className={style.movieContent}>
          <MoviePoster {...movieData} />
          <div className={style.rightContainer}>
            <MovieInfo {...movieData} />
            <MovieRatings {...movieData} />
          </div>
        </div>
        <MovieReviewContainer movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieDetail;
