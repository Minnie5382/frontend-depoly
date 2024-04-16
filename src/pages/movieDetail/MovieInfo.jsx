import React, { useState } from 'react';
import style from './MovieDetail.module.css';
import ReviewModal from './ReviewModal';

const MovieInfo = ({ title, genre, description, castAndCrew }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitReview = (reviewText) => {
    console.log('Review Submitted: ', reviewText);
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
          <span onClick={handleOpenModal} className={style.reviewButton}>
            평론 남기기
          </span>
          <span className={style.heartButton}>❤</span>
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
        onSubmit={handleSubmitReview}
      />
    </div>
  );
};

export default MovieInfo;
