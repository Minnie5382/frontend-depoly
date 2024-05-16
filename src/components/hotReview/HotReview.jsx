import React from 'react';
import style from './HotReview.module.css';
import { Link } from 'react-router-dom';
import LikeButton from '../button/LikeButton';
import EditDeleteButtons from '../button/EditDeleteButtons';
import { useUser } from '../../utils/UserContext';

const HotReview = ({
  likeNumber,
  movieId,
  moviePoster,
  movieTitle,
  reviewContent,
  reviewId,
  reviewScore,
  reviewWriterId,
  reviewWriterNickname,
  isLiked,
  level,
  collectionRefetch,
}) => {
  const { user } = useUser();
  const isMyReview = user?.result?.userId === reviewWriterId ? true : false;

  return (
    <div className={style.container}>
      <div className={style.reviewBox}>
        <Link to={`/movies/${movieId}`}>
          <img
            className={style.moviePoster}
            src={`${moviePoster}`}
            alt={moviePoster}
          />
        </Link>
        <div className={style.movieReview}>
          <div className={style.nameSpan}>
            <Link to={`/movies/${movieId}`}>
              <span className={style.movieName}>{movieTitle}</span>
            </Link>
            {reviewScore && <div className={style.stars}>★ {reviewScore}</div>}
          </div>
          <div className={style.divisionLine} />
          <div>
            <Link to={`/userinfo/${reviewWriterId}`}>
              <span style={{ fontWeight: 800 }}>
                Lv.{level}&nbsp;
                {reviewWriterNickname}
              </span>
            </Link>
            <div className={style.reviewContent}>{reviewContent}</div>
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
        </div>
      </div>
    </div>
  );
};
export default HotReview;
