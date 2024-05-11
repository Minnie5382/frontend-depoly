import React, { useEffect, useState, useRef } from 'react';
import style from './Main.module.css';
import HotReview from '../../components/hotReview/HotReview';
import { useQuery } from 'react-query';
import { getHotReviews } from '../../utils/review';
import { useNavigate } from 'react-router-dom';

const MainHotReviewList = () => {
  const navigate = useNavigate();
  const {
    data: reveiwData,
    isLoading,
    isError,
  } = useQuery('mainHotReview', () => getHotReviews(5), {
    refetchOnWindowFocus: false,
    withCredentials: false,
  });

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200; // 스크롤을 왼쪽으로 200px 이동
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200; // 스크롤을 오른쪽으로 200px 이동
    }
  };

  console.log(reveiwData?.data.result.reviews);

  return (
    <div className={style.reviewContainer}>
      <h2>최신 인기 평론</h2>
      <div className={style.reviewBox}>
        <button className={style.moveLeftBtn} onClick={scrollLeft}>
          〈
        </button>
        <div className={style.reviewContainerInner} ref={sliderRef}>
          <div className={style.slideWrapper}>
            {isLoading ? (
              <div>isLoading...</div>
            ) : isError ? (
              <div>isError...</div>
            ) : (
              reveiwData?.data.result.reviews.map((inData, index) => (
                <HotReview key={index} {...inData} />
              ))
            )}
            <div
              className={style.moreView}
              onClick={() => navigate('/hotReviews')}
            >
              더보기
            </div>
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
