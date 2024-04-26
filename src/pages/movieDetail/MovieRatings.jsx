import React from 'react';
import Rating from '@mui/material/Rating';
import style from './MovieDetail.module.css';

const MovieRatings = ({ cinephileAvgRating, levelAvgRating, allAvgRating }) => {
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
          value={cinephileAvgRating}
          precision={0.5}
          readOnly
          sx={initRating}
        />
      </div>
      <div className={style.levelTen}>
        <p>Lv.10 이상 별점</p>
        <Rating
          value={levelAvgRating}
          precision={0.5}
          readOnly
          sx={initRating}
        />
      </div>
      <div className={style.allUser}>
        <p>모든 유저 별점</p>
        <Rating value={allAvgRating} precision={0.5} readOnly sx={initRating} />
      </div>
    </div>
  );
};

export default MovieRatings;
