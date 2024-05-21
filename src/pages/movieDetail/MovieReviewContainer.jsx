import React from 'react';
import { useQuery } from 'react-query';
import MovieReview from '../../components/movieReview/MovieReview';
import style from './MovieDetail.module.css';
import { getReviewsByMovieId } from '../../utils/review';
import { Link } from '@mui/material';
import { useHorizontalScroll } from '../../utils/useSideScroll';

const MovieReviewContainer = ({ movieId }) => {
  const sliderRef = useHorizontalScroll();

  const { data, isLoading, isError, refetch } = useQuery(
    ['reviews', movieId],
    () => getReviewsByMovieId(movieId),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생!</div>;

  const result = data?.data.result;
  const reviews = result.reviews ?? [];
  const myReview = result.reviews.find((review) => review.isMyReview === true);
  const otherReviews = result.reviews.filter((review) => !review.isMyReview);

  return (
    <div className={style.reviewContainer} ref={sliderRef}>
      {reviews.length === 0 ? (
        <div className={style.noReviews}>아직 작성된 평론이 없습니다!</div>
      ) : (
        <>
          {myReview && (
            <MovieReview {...myReview} collectionRefetch={refetch} />
          )}
          {otherReviews.slice(0, 9).map((review) => (
            <MovieReview
              key={review.reviewId}
              {...review}
              collectionRefetch={refetch}
            />
          ))}
          {otherReviews.length >= 9 && (
            <div className={style.seeMore}>
              <Link href={`/movies/${movieId}/reviews`}>
                <span>평론 모아보기</span>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieReviewContainer;
