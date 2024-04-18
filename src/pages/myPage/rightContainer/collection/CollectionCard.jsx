import React from 'react';
import style from '../../MyPage.module.css';

const CollectionCard = ({ content, star, likeNumber, createdAt }) => {
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
          <button className={style.likeButton}>👍</button> {likeNumber}
        </div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
