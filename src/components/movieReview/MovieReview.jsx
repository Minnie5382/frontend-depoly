import React from 'react';
import style from './MovieReview.module.css';

const MovieReview = ({
  nickname,
  name,
  level,
  profileImage,
  content,
  star,
  likeNumber,
  createdAt,
}) => {
  return (
    <div className={style.container}>
      <div className={style.topSection}>
        <div className={style.info}>
          <img
            src={profileImage}
            alt='Profile'
            className={style.profileImage}
          />
          <div className={style.infoBox}>
            <div className={style.level}>
              Lv.{level} {name}
            </div>
            <div className={style.time}>{createdAt}</div>
          </div>
        </div>
        <div className={style.stars}>★ {star}</div>
      </div>
      <hr />
      <div className={style.content}>{content}</div>
      <div className={style.likes}>
        <button className={style.likeButton}>👍</button> {likeNumber}
      </div>
    </div>
  );
};

export default MovieReview;
