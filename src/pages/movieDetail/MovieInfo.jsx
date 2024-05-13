import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import style from './MovieDetail.module.css';
import ReviewModal from '../../components/reviewModal/ReviewModal';
import { likeMovie, unlikeMovie } from '../../utils/movie';
import { createOrUpdateScore } from '../../utils/review';
import useConfirmLogin from '../../utils/useConfirmLogin';

const MovieInfo = ({ movie, refetch }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [score, setScore] = useState(movie?.myScore || 0);

  const movieId = movie?.movie.movieId;
  const { confirmLogin } = useConfirmLogin();

  useEffect(() => {
    if (movie?.myScore !== undefined) {
      setScore(movie.myScore);
    }
  }, [movie?.myScore]);

  const { mutate: sendScore, isLoading: ratingLoading } = useMutation(
    (score) => createOrUpdateScore({ movieId, score }),
    {
      onError: (error) => {
        alert(`별점 업데이트 실패!`);
      },
    }
  );

  const { mutate: toggleScrap } = useMutation(
    () => {
      if (movie?.isScrap) {
        return unlikeMovie(movieId);
      } else {
        return likeMovie(movieId);
      }
    },
    {
      onSuccess: () => {
        refetch();
      },
    },

    {
      onError: (error) => {
        alert(`오류가 발생했습니다!`);
      },
    }
  );

  const handleLikeMovie = () => {
    if (confirmLogin()) {
      if (movie?.isScrap) {
        if (window.confirm('정말 스크랩을 취소하실건가요?')) {
          toggleScrap();
        }
      } else {
        toggleScrap();
      }
    }
  };

  const handleRatingChange = (event, newValue) => {
    if (confirmLogin()) {
      setScore(newValue);
      if (newValue > 0) {
        sendScore(newValue);
      } else {
        alert('0점은 평점에 반영되지 않습니다!');
      }
    }
  };

  const handleOpenModal = () => {
    if (confirmLogin()) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}시간` : ''} ${remainingMinutes}분`.trim();
  };

  return (
    <div className={style.movieInfo}>
      <div className={style.topSection}>
        <div className={style.titleBox}>
          <span className={style.title}>
            {movie?.movie.movieTitle} ({movie?.movie.releaseDate})
          </span>
          <span className={style.genre}>
            {movie?.movie.genre
              .map(
                (genre, index, array) =>
                  `${genre}${index < array.length - 1 ? ', ' : ''}`
              )
              .join('')}
            &nbsp;/&nbsp;
            {movie?.movie.originCountry}&nbsp;/&nbsp;
            {formatRuntime(movie?.runtime)}
          </span>
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
            {movie?.existingReviewId ? '평론 수정하기' : '평론 남기기'}
          </span>
          <IconButton
            onClick={handleLikeMovie}
            color='error'
            sx={{ m: 0, p: 0 }}
          >
            {movie?.isScrap ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </div>
      <div className={style.introductionBox}>
        <span className={style.introduction}>
          {movie?.introduction || '아직 작성된 영화 소개글이 없습니다.'}
        </span>
      </div>
      <div className={style.castAndCrew}>
        <span>출연/제작</span>
        <div className={style.castList}>
          {movie?.crewList.map((person, index) => (
            <div key={index} className={style.castItem}>
              <img
                src={person.profile}
                alt={person.name}
                className={style.castImg}
              />
              <div className={style.role}>
                <span style={{ fontWeight: 800 }} title={person.name}>
                  {person.name}
                </span>
                <span
                  title={
                    person.job === 'Actor'
                      ? person.character || person.job
                      : person.job
                  }
                >
                  {person.job === 'Actor'
                    ? person.character || person.job
                    : person.job}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movieId={movieId}
        existingReviewId={movie?.existingReviewId}
      />
    </div>
  );
};

export default MovieInfo;
