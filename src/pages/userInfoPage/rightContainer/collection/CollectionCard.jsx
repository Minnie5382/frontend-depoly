import React from 'react';
import style from '../../UserInfoPage.module.css';
import EditDeleteButtons from '../../../../components/button/EditDeleteButtons';
import LikeButton from '../../../../components/button/LikeButton';

const CollectionCard = ({
  content,
  userScore,
  likeNumber,
  movieTitle,
  reviewId,
  isLiked,
  isMyReview,
}) => {
  return (
    <div className={style.collection}>
      <div className={style.topSection}>
        <div className={style.info}>
          <div className={style.infoBox}>
            <div className={style.time}>{movieTitle}</div>
          </div>
        </div>
        <div className={style.stars}>★ {userScore}</div>
      </div>
      <hr />
      <div className={style.content}>{content}</div>
      <div className={style.btnBox}>
        <div className={style.likes}>
          <LikeButton reviewId={reviewId} isLiked={isLiked} />
          <span style={{ marginLeft: '5px' }}>{likeNumber}</span>
        </div>
        {isMyReview && (
          <div>
            <EditDeleteButtons reviewId={reviewId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
