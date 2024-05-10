import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import style from './MovieDetail.module.css';

const MovieRatings = ({ movie }) => {
  const initRating = {
    '.MuiRating-iconEmpty': {
      color: 'var(--text-color)',
    },
  };

  const [cinephileAvgScore, setCinephileAvgScore] = useState(0);
  const [levelAvgScore, setLevelAvgScore] = useState(0);
  const [allAvgScore, setAllAvgScore] = useState(0);

  useEffect(() => {
    if (movie) {
      setCinephileAvgScore(movie.cinephileAvgScore || 0);
      setLevelAvgScore(movie.levelAvgScore || 0);
      setAllAvgScore(movie.allAvgScore || 0);
    }
  }, [movie]);

  return (
    <div className={style.ratings}>
      <div className={style.cinephile}>
        <p>씨네필 별점</p>
        <Rating
          value={cinephileAvgScore}
          precision={0.5}
          readOnly
          sx={initRating}
        />
      </div>
      <div className={style.levelTen}>
        <p>Lv.10 이상 별점</p>
        <Rating
          value={levelAvgScore}
          precision={0.5}
          readOnly
          sx={initRating}
        />
      </div>
      <div className={style.allUser}>
        <p>모든 유저 별점</p>
        <Rating value={allAvgScore} precision={0.5} readOnly sx={initRating} />
      </div>
    </div>
  );
};

export default MovieRatings;
