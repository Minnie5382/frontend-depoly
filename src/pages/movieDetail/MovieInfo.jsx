import React, { useState } from 'react';
import { useMutation } from 'react-query';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import style from './MovieDetail.module.css';
import ReviewModal from '../../components/reviewModal/ReviewModal';
import { likeMovie, unlikeMovie } from '../../utils/movie';
// import { submitRating } from '../../utils/review';

const MovieInfo = ({
  title,
  genre,
  description,
  castAndCrew,
  movieId,
  rating: initialRating,
  isScrap,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(initialRating);

  // const { mutate: sendRating, isLoading: ratingLoading } = useMutation(
  //   (newRating) => submitRating({ movieId, rating: newRating }),
  //   {
  //     onSuccess: () => {
  //       alert('별점이 성공적으로 업데이트 되었습니다.');
  //     },
  //     onError: (error) => {
  //       alert(`별점 업데이트 실패! : ${error.message}`);
  //     },
  //   }
  // );

  const { mutate: toggleScrap } = useMutation(
    () => {
      if (isScrap) {
        return unlikeMovie(movieId);
      } else {
        return likeMovie(movieId);
      }
    },
    {
      onSuccess: () => {
        alert(isScrap ? '영화 스크랩 취소 완료!' : '영화 스크랩 완료!');
      },
      onError: (error) => {
        alert(`오류가 발생했습니다! : ${error.message}`);
      },
    }
  );

  const handleLikeMovie = () => {
    if (isScrap) {
      if (window.confirm('정말 스크랩을 취소하실건가요?')) {
        toggleScrap();
      }
    } else {
      toggleScrap();
    }
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    if (newValue > 0) {
      // sendRating({ movieId, rating: newValue });
    } else {
      alert('0점은 평점에 반영되지 않습니다!');
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={style.movieInfo}>
      <div className={style.topSection}>
        <div>
          <span className={style.title}>{title}</span>
          <p className={style.genre}>{genre}</p>
        </div>
        <div className={style.actions}>
          <Rating
            name='simple-controlled'
            value={rating}
            onChange={handleRatingChange}
            size='large'
            precision={0.5}
            // disabled={ratingLoading}
            sx={{
              '.MuiRating-iconEmpty': {
                color: 'var(--text-color)',
              },
            }}
          />
          <span onClick={handleOpenModal} className={style.reviewButton}>
            평론 남기기
          </span>
          <IconButton
            onClick={handleLikeMovie}
            color='error'
            sx={{ m: 0, p: 0 }}
          >
            {isScrap ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </div>
      <p className={style.description}>{description}</p>
      <div className={style.castAndCrew}>
        <span>출연/제작</span>
        <div className={style.castList}>
          {castAndCrew.map((person, index) => (
            <span key={index} className={style.castItem}>
              {person}
            </span>
          ))}
        </div>
      </div>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movieId={movieId}
      />
    </div>
  );
};

export default MovieInfo;
