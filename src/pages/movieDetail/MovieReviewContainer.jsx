import React from 'react';
import { useQuery } from 'react-query';
import MovieReview from '../../components/movieReview/MovieReview';
import style from './MovieDetail.module.css';
import { getReviewsByMovieId } from '../../utils/review';
import { Link } from '@mui/material';

const MovieReviewContainer = ({ movieId }) => {
  const { data, isLoading, error } = useQuery(
    ['reviews', movieId],
    () => getReviewsByMovieId(movieId, 11),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>{error.message}</div>;

  const myReview = data.result.find((review) => review.myReview === true);
  const otherReviews = data.result.filter((review) => !review.myReview);

  return (
    <div className={style.reviewContainer}>
      {myReview && <MovieReview {...myReview} />}
      {otherReviews.slice(0, 9).map((review) => (
        <MovieReview key={review.reviewId} {...review} />
      ))}
      {otherReviews.length > 9 && (
        <div className={style.seeMore}>
          <Link href={`/movies/${movieId}/reviews`}>
            평론 모아보기로 이동하기
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieReviewContainer;
