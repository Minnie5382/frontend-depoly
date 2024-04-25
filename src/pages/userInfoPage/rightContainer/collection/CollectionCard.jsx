import React from 'react';
import style from '../../UserInfoPage.module.css';
import EditDeleteButtons from '../../../../components/button/EditDeleteButtons';
import LikeButton from '../../../../components/button/LikeButton';

const CollectionCard = ({ content, star, likeNumber, createdAt, reviewId }) => {
  return (
    <div className={style.collection}>
      <div className={style.topSection}>
        <div className={style.info}>
          <div className={style.infoBox}>
            <div className={style.time}>{createdAt}</div>
          </div>
        </div>
        <div className={style.stars}>★ {star}</div>
      </div>
      <hr />
      <div className={style.content}>{content}</div>
      <div className={style.btnBox}>
        <div className={style.likes}>
          <LikeButton />
          <span style={{ marginLeft: '5px' }}>{likeNumber}</span>
        </div>
        <div>
          <EditDeleteButtons reviewId={reviewId} />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
