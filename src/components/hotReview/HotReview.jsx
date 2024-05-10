import React from 'react';
import style from './HotReview.module.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const HotReview = ({
  createdAt,
  likeNumber,
  movieId,
  moviePoster,
  movieTitle,
  reviewContent,
  reviewId,
  reviewWriterId,
  reviewScore,
  reviewWriterNickname,
}) => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.reviewBox}>
        <img
          className={style.moviePoster}
          src={`${moviePoster}`}
          onClick={() => navigate('/movies/' + movieId)}
        />
        <div className={style.movieReview}>
          <div className={style.nameSpan}>
            <span className={style.movieName}>{movieTitle}</span>
            <span>별{reviewScore}</span>
          </div>
          <div className={style.divisionLine} />
          <div className={style.contentBox}>
            {reviewWriterNickname}
            <div className={style.reviewContent}>{reviewContent}</div>
            <div className={style.likeCount}>👍{likeNumber}</div>
          </div>
        </div>
        {/* <div className={style.likeCount}>굿100</div> */}
      </div>
    </div>
  );
};
export default HotReview;
