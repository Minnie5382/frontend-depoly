import React from 'react';
import style from './Main.module.css';
import HotReview from '../../components/hotReview/HotReview';
import { useQuery } from 'react-query';
import { getHotReviews } from '../../utils/review';
import { Link } from 'react-router-dom';
import { useHorizontalScroll } from '../../utils/useSideScroll';

const MainHotReviewList = () => {
  const {
    data: reviewData,
    isLoading,
    isError,
    refetch,
  } = useQuery('mainHotReview', () => getHotReviews(), {
    refetchOnWindowFocus: false,
  });

  const sliderRef = useHorizontalScroll();

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - 200,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + 200,
        behavior: 'smooth',
      });
    }
  };

  const hasReviews = reviewData?.data?.result?.reviews?.length > 0;

  return (
    <div className={style.reviewContainer}>
      <h2>인기 평론</h2>
      <div className={style.reviewBox}>
        <button className={style.moveLeftBtn} onClick={scrollLeft}>
          〈
        </button>
        <div className={style.reviewContainerInner} ref={sliderRef}>
          <div className={style.slideWrapper}>
            {isLoading ? (
              <div>로딩 중...</div>
            ) : isError ? (
              <div> 인기 평론이 존재하지 않아요!</div>
            ) : hasReviews ? (
              reviewData.data.result.reviews.map((inData, index) => (
                <HotReview
                  key={index}
                  {...inData}
                  collectionRefetch={refetch}
                />
              ))
            ) : (
              <div>인기 평론이 존재하지 않아요!</div>
            )}
            {hasReviews && (
              <Link to={'/hotReviews'} className={style.moreView}>
                더보기
              </Link>
            )}
          </div>
        </div>
        <button className={style.moveRightBtn} onClick={scrollRight}>
          〉
        </button>
      </div>
    </div>
  );
};

export default MainHotReviewList;
