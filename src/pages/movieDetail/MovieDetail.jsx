import React from 'react';
import { useParams } from 'react-router-dom';
import style from './MovieDetail.module.css';
import Header from '../../components/header/Header';
import MoviePoster from './MoviePoster';
import MovieInfo from './MovieInfo';
import MovieRatings from './MovieRatings';
import logo from '../../assets/logo.png';
import MovieReviewContainer from './MovieReviewContainer';
import MovieReview from '../../components/movieReview/MovieReview';

const MovieDetail = () => {
  const { movieId } = useParams();

  const movieData = {
    title: '영화 제목',
    genre: '장르 / 액션, 모험',
    description: '영화 줄거리...',
    cinephileRating: 4,
    levelTenRating: 3,
    allUserRating: 1.5,
    isScrap: true,
    rating: 3,
    myReview: true,
    reviewId: 123,
  };

  return (
    <div className={style.container}>
      <Header />
      <div className={style.mainContainer}>
        <div className={style.movieContent}>
          <MoviePoster src={logo} alt='Movie Poster' />
          <div className={style.rightContainer}>
            <MovieInfo
              {...movieData}
              castAndCrew={['홍길동', '임꺽정', '추가 인물...']}
            />
            <MovieRatings {...movieData} />
          </div>
        </div>
        <MovieReviewContainer movieId={movieId} />
        <MovieReview {...movieData} />
      </div>
    </div>
  );
};

export default MovieDetail;
