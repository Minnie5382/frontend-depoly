import React from 'react';
import style from '../../UserInfoPage.module.css';
import EditDeleteButtons from '../../../../components/button/EditDeleteButtons';
import LikeButton from '../../../../components/button/LikeButton';
import { Link } from 'react-router-dom';

const CollectionCard = ({
  content,
  userScore,
  likeNumber,
  movieTitle,
  reviewId,
  isLiked,
  isMyReview,
  collectionRefetch,
  movieId,
}) => {
  return (
    <div className={style.collection}>
      <div className={style.topSection}>
        <div className={style.info}>
          <div className={style.infoBox}>
            <Link to={`/movies/${movieId}`}>
              <div className={style.time} title={movieTitle}>
                {movieTitle}
              </div>
            </Link>
          </div>
        </div>
        <div className={style.stars}>★ {userScore}</div>
      </div>
      <hr />
      <div className={style.content}>{content}</div>
      <div className={style.btnBox}>
        <div className={style.likes}>
          <LikeButton
            reviewId={reviewId}
            isLiked={isLiked}
            collectionRefetch={collectionRefetch}
          />
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
