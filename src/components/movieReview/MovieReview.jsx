import React from 'react';
import style from './MovieReview.module.css';
import LikeButton from '../button/LikeButton';
import EditDeleteButtons from '../button/EditDeleteButtons';

const MovieReview = ({
  name,
  level,
  profileImage,
  content,
  star,
  likeNumber,
  createdAt,
  myReview,
  reviewId,
  isLiked,
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
      <div className={style.btnBox}>
        <div className={style.likes}>
          <LikeButton isLiked={isLiked} />
          <span style={{ marginLeft: '5px' }}>{likeNumber}</span>
        </div>
        {myReview && (
          <span className={style.editControls}>
            <EditDeleteButtons reviewId={reviewId} />
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieReview;
