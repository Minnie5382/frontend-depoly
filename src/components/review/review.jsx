import React from 'react';
import style from './review.module.css';
import LikeButton from '../button/LikeButton';
import { Link } from 'react-router-dom';
import { useUser } from '../../utils/UserContext';
import EditDeleteButtons from '../button/EditDeleteButtons';

const Review = ({
  moviePoster,
  movieTitle,
  level,
  reviewWriterNickname,
  reviewScore,
  reviewContent,
  isLiked,
  collectionRefetch,
  reviewId,
  likeNumber,
  movieId,
  reviewWriterId,
}) => {
  const { user } = useUser();
  const isMyReview = user?.result?.userId === reviewWriterId ? true : false;

  return (
    <div className={style.container}>
      <div className={style.reviewBox}>
        <Link to={`/movies/${movieId}`}>
          <img
            className={style.moviePoster}
            src={moviePoster}
            alt={moviePoster}
          />
        </Link>
        <div className={style.movieReview}>
          <div className={style.nameSpan}>
            <Link to={`/movies/${movieId}`}>
              <span className={style.movieName}>{movieTitle}</span>
            </Link>
            <span className={style.movieStar}>★&nbsp;{reviewScore}</span>
          </div>
          <div className={style.divisionLine} />
          <div className={style.contentBox}>
            <Link to={`/userinfo/${reviewWriterId}`}>
              <span>
                Lv.{level}&nbsp;
                {reviewWriterNickname}
              </span>
            </Link>
            <div className={style.reviewContent}>{reviewContent}</div>
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
  );
};
export default Review;
