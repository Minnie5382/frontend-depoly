import React from 'react';
import style from './HotReview.module.css';
import logo from '../../assets/logo.png';

const HotReview = ({
  reviewId,
  moviePoster,
  movieName,
  reviewer,
  star,
  content,
  like,
}) => {
  return (
    <div className={style.container}>
      <div className={style.reviewBox}>
        <img className={style.moviePoster} src={logo} />
        <div className={style.movieReview}>
          <div className={style.nameSpan}>
            <span className={style.movieName}>{movieName}</span>
            <span>{star}</span>
          </div>
          <div className={style.divisionLine} />
          <div className={style.contentBox}>
            {reviewer}
            <div className={style.reviewContent}>{content}</div>
            <div className={style.likeCount}>👍{like}</div>
          </div>
        </div>
        {/* <div className={style.likeCount}>굿100</div> */}
      </div>
    </div>
  );
};
export default HotReview;
