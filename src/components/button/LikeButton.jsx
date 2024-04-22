import React from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useMutation } from 'react-query';
import { likeReview, unlikeReview } from '../../utils/review';

const LikeButton = ({ reviewId, isLiked }) => {
  const { mutate } = useMutation(() =>
    isLiked ? unlikeReview(reviewId) : likeReview(reviewId)
  );

  const handleToggleLike = () => {
    mutate();
  };

  return (
    <>
      <IconButton
        onClick={handleToggleLike}
        color='default'
        sx={{ m: 0, p: 0, color: 'white' }}
      >
        {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
      </IconButton>
    </>
  );
};

export default LikeButton;
