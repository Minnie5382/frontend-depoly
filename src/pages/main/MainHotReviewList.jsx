import React, { useEffect, useState } from 'react';
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
  console.log(reveiwData?.data.result.reviews);

  return (
    <div className={style.reviewContainer}>
      <h2>최신 인기 평론</h2>
      <div className={style.reviewBox}>
        <button className={style.moveLeftBtn}>〈</button>
        <div className={style.reviewContainerInner}>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error...</div>
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
        <button className={style.moveRightBtn}>〉</button>
      </div>
    </div>
  );
};
export default MainHotReviewList;
