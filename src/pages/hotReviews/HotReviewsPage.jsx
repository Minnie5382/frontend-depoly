import React from 'react';
import style from './HotReviewsPage.module.css';
import Header from '../../components/header/Header';
import HotReview from '../../components/hotReview/HotReview';
const HotReviewsPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.reviewsContainer}>
        <div className={style.title}>
          <h4>최근 인기평론</h4>
          <h4>15+</h4>
        </div>
        <div className={style.reviewBox}>
          {/* map */}
          <HotReview />
          <HotReview />
          <HotReview />
          <HotReview />
          <HotReview />
          <HotReview />
          <HotReview />
        </div>
      </div>
    </div>
  );
};
export default HotReviewsPage;
