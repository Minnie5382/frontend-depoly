import React from 'react';
import style from './review.module.css';
import logo from '../../assets/logo.png';

const Review = ({ moviePoster, movieName, reviewer, star, content, like }) => {
  return (
    <div className={style.container}>
      <div className={style.reviewBox}>
        <img className={style.moviePoster} src={logo} />
        <div className={style.movieReview}>
          <div className={style.nameSpan}>
            <span className={style.movieName}>
              {movieName}
              어바웃타임
            </span>
            <span className={style.movieStar}>{star}⭐️⭐️⭐️⭐️⭐️</span>
          </div>
          <div className={style.divisionLine} />
          <div className={style.contentBox}>
            <span>{reviewer}글쓴이</span>
            <div className={style.reviewContent}>{content}</div>
            <div className={style.likeCount}>👍100{like}</div>
          </div>
        </div>
        {/* <div className={style.likeCount}>굿100</div> */}
      </div>
    </div>
  );
};
export default Review;
