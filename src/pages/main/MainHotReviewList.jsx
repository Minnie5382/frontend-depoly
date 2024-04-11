import React from 'react';
import style from './Main.module.css';
import HotReview from '../../components/hotReview/HotReview';

const MainHotReviewList = () => {
  return (
    <div className={style.reviewContainer}>
      <h4>최신 인기 평론</h4>
      <div className={style.reviewBox}>
        <button className={style.moveLeftBtn}>〈</button>
        <div className={style.reviewContainerInner}>
          <HotReview />
          <HotReview />
          <HotReview />
          <HotReview />
        </div>
        <button className={style.moveRightBtn}>〉</button>
      </div>
    </div>
  );
};
export default MainHotReviewList;
