import React from 'react';
import style from './MovieReview.module.css';
import LikeButton from '../button/LikeButton';
import EditDeleteButtons from '../button/EditDeleteButtons';
import { Link } from 'react-router-dom';

const MovieReview = ({
  nickname,
  userId,
  level,
  userProfileImage,
  content,
  score,
  likeNumber,
  createdAt,
  isMyReview,
  reviewId,
  isLiked,
  isCertified,
  isBad,
  collectionRefetch,
}) => {
  return (
    <div className={style.container}>
      <div className={style.topSection}>
        <div className={style.info}>
          <img
            src={userProfileImage}
            alt='Profile'
            className={style.profileImage}
          />
          <div className={style.infoBox}>
            <div className={style.level}>
              <Link to={`/userInfo/${userId}`}>
                Lv.{level} {nickname}
              </Link>
              {isCertified && { isCertified }}
              {isBad && { isBad }}
            </div>
            <div className={style.time}>{createdAt}</div>
          </div>
        </div>
        <div className={style.stars}>★ {score}</div>
      </div>
      <hr />
      <div className={style.content}>{content}</div>
      <div className={style.btnBox}>
        <div className={style.likes}>
          <LikeButton
            isLiked={isLiked}
            collectionRefetch={collectionRefetch}
            reviewId={reviewId}
          />
          <span style={{ marginLeft: '5px' }}>{likeNumber}</span>
        </div>
        {isMyReview && (
          <span className={style.editControls}>
            <EditDeleteButtons reviewId={reviewId} />
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieReview;
