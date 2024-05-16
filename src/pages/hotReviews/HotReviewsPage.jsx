import React from 'react';
import style from './HotReviewsPage.module.css';
import Review from '../../components/review/review';
import { getHotReviews } from '../../utils/review';
import useInfiniteScroll from '../../utils/useInfiniteScroll';

const HotReviewsPage = () => {
  const { data, isLoading, isError, loader } = useInfiniteScroll(getHotReviews);

  const hotReviews =
    data?.pages.flatMap((page) => page.data.result.reviews) || [];

  return (
    <div className={style.container}>
      <div className={style.contentsContainer}>
        <div className={style.reviewsContainer}>
          <div className={style.title}>
            <h4>인기 평론</h4>
            <h4>{hotReviews.length}+</h4>
          </div>
          <div className={style.reviewBox}>
            {isLoading && <span>로딩중...</span>}
            {isError && <span>에러 발생!</span>}
            {hotReviews.map((review) => (
              <Review key={review.reviewId} {...review} />
            ))}
            <div ref={loader} style={{ height: '20px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotReviewsPage;
