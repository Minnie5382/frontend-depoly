import React, { useState } from 'react';
import { useMutation } from 'react-query';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import style from './MovieDetail.module.css';
import ReviewModal from '../../components/reviewModal/ReviewModal';
import { likeMovie, unlikeMovie } from '../../utils/movie';
import { createOrUpdateScore } from '../../utils/review';

const MovieInfo = ({
  movieTitle,
  genre,
  introduction,
  crewList,
  movieId,
  myScore,
  isScrap,
  releaseDate,
  originCountry,
  runtime,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [score, setScore] = useState(myScore ? myScore : 0);

  const { mutate: sendScore, isLoading: ratingLoading } = useMutation(
    (score) => createOrUpdateScore({ movieId, score }),
    {
      onError: (error) => {
        alert(`별점 업데이트 실패! : ${error.message}`);
      },
    }
  );

  const { mutate: toggleScrap } = useMutation(
    () => {
      if (isScrap) {
        return unlikeMovie(movieId);
      } else {
        return likeMovie(movieId);
      }
    },
    {
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
    setScore(newValue);
    if (newValue > 0) {
      sendScore({ score: newValue });
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
          <span className={style.title}>
            {movieTitle} ({releaseDate})
          </span>
          <p className={style.genre}>
            {genre} / {originCountry} / {runtime}
          </p>
        </div>
        <div className={style.actions}>
          <Rating
            name='simple-controlled'
            value={score}
            onChange={handleRatingChange}
            size='large'
            precision={0.5}
            disabled={ratingLoading}
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
      <p className={style.introduction}>{introduction}</p>
      <div className={style.castAndCrew}>
        <span>출연/제작</span>
        <div className={style.castList}>
          {crewList.map((person, index) => (
            <div key={index} className={style.castItem}>
              {person.name}
              {person.profile}
              {person.job}
              {person.character}
            </div>
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
