import React from 'react';
import Rating from '@mui/material/Rating';
import style from './MovieDetail.module.css';

const MovieRatings = ({ cinephileRating, levelTenRating, allUserRating }) => {
  const initRating = {
    '.MuiRating-iconEmpty': {
      color: 'var(--text-color)',
    },
  };

  return (
    <div className={style.ratings}>
      <div className={style.cinephile}>
        <p>씨네필 별점</p>
        <Rating
          value={cinephileRating}
          precision={0.5}
          readOnly
          sx={initRating}
        />
      </div>
      <div className={style.levelTen}>
        <p>Lv.10 이상 별점</p>
        <Rating
          value={levelTenRating}
          precision={0.5}
          readOnly
          sx={initRating}
        />
      </div>
      <div className={style.allUser}>
        <p>모든 유저 별점</p>
        <Rating
          value={allUserRating}
          precision={0.5}
          readOnly
          sx={initRating}
        />
      </div>
    </div>
  );
};

export default MovieRatings;
