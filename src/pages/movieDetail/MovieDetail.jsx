import React from 'react';
import style from './MovieDetail.module.css';
import Header from '../../components/header/Header';
import MovieReview from '../../components/movieReview/MovieReview';
import MoviePoster from './MoviePoster';
import MovieInfo from './MovieInfo';
import MovieRatings from './MovieRatings';
import logo from '../../assets/logo.png';

const MovieDetail = () => {
  const movieData = {
    title: '영화 제목',
    genre: '장르 / 액션, 모험',
    description: '영화 줄거리...',
    cinephileRating: '★★★★☆',
    levelTenRating: '★★★☆☆',
    allUserRating: '★★★★☆',
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
        <div className={style.reviewContainer}>
          <MovieReview />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
