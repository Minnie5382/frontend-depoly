import React from 'react';
import style from './MovieDetail.module.css';

const MovieRatings = ({ cinephileRating, levelTenRating, allUserRating }) => {
  return (
    <div className={style.ratings}>
      <div>
        <p>씨네필 별점</p>
        <span>{cinephileRating}</span>
      </div>
      <div>
        <p>Lv.10 이상 별점</p>
        <span>{levelTenRating}</span>
      </div>
      <div>
        <p>모든 유저 별점</p>
        <span>{allUserRating}</span>
      </div>
    </div>
  );
};

export default MovieRatings;
