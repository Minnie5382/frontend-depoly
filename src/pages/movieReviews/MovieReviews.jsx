import React from 'react';
import MovieReview from '../../components/movieReview/MovieReview';
import style from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { getReviewsByMovieId } from '../../utils/review';
import useInfiniteScroll from '../../utils/useInfiniteScroll';

const MovieReviews = () => {
  const { movieId } = useParams();
  const {
    data: reviews,
    isLoading,
    isError,
    loader,
    refetch: collectionRefetch,
  } = useInfiniteScroll(getReviewsByMovieId, movieId);

  if (isLoading && !reviews) return <span>로딩중...</span>;
  if (isError) return <span>평론을 불러오는 중 오류가 발생했습니다!</span>;

  const reviewElements = reviews?.pages.map((page) =>
    page.data.result.reviews.map((review) => (
      <MovieReview
        key={review.reviewId}
        {...review}
        collectionRefetch={collectionRefetch}
      />
    ))
  );

  return (
    <div className={style.container}>
      <div className={style.reviewContainer}>
        <div className={style.topSection}>
          <span>평론 모아보기</span>
          <span>{reviews.pages[0].data.result.totalReviewNum}+</span>
        </div>
        <div className={style.reviewsList}>{reviewElements}</div>
        <div ref={loader} />
      </div>
    </div>
  );
};

export default MovieReviews;
