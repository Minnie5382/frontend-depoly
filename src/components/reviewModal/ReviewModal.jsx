import React, { useState } from 'react';
import { useMutation } from 'react-query';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createReview, editReview } from '../../utils/review';

const ReviewModal = ({
  isOpen,
  onClose,
  movieId,
  reviewId,
  content: initialContent = '',
  existingReviewId,
}) => {
  const [content, setContent] = useState(initialContent || '');

  const effectiveReviewId = reviewId || existingReviewId;
  const apiFunction = effectiveReviewId ? editReview : createReview;

  const { mutate: submitReview, isLoading } = useMutation(
    (data) => {
      if (effectiveReviewId) {
        return apiFunction(effectiveReviewId, data);
      }
      return apiFunction(data);
    },
    {
      onSuccess: () => {
        alert('평론이 성공적으로 제출되었습니다.');
        setContent('');
        onClose();
      },
      onError: (error) => {
        alert(`평론 제출 실패! : ${error.message}`);
      },
    }
  );

  const handleReviewSubmit = () => {
    if (content.trim()) {
      const reviewData = { movieId, content };
      if (reviewId || existingReviewId) {
        submitReview({ ...reviewData, reviewId });
      } else {
        submitReview(reviewData);
      }
    } else {
      alert('평론 내용을 입력해주세요.');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      sx={{
        '& .MuiDialog-paper': {
          width: '600px',
          height: 'auto',
          bgcolor: 'var(--background-color)',
          padding: '20px',
        },
      }}
    >
      <DialogTitle id='form-dialog-title' sx={{ color: 'var(--text-color)' }}>
        {reviewId || existingReviewId ? '평론 수정하기' : '평론 작성하기'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            autoFocus
            margin='dense'
            id={`review-${reviewId || 'new'}`}
            label={
              reviewId || existingReviewId
                ? '평론을 수정해보세요!'
                : '평론을 작성해보세요!'
            }
            type='text'
            fullWidth
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              bgcolor: 'var(--sub-color)',
              '& .MuiInputLabel-root': {
                color: 'var(--text-color)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--border-color)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--point-color)',
                },
              },
            }}
            variant='outlined'
            InputProps={{
              style: { color: 'var(--text-color)' },
              inputProps: {
                maxLength: 1000,
              },
            }}
          />
          <Typography
            variant='caption'
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              color: 'var(--text-color)',
              padding: '0 4px',
              borderRadius: '4px',
            }}
          >
            {content.length} / 1000
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color='primary'
          sx={{
            bgcolor: 'var(--sub-color)',
            color: 'var(--text-color)',
            borderColor: 'var(--border-color)',
            ':hover': { bgcolor: '#1f262e' },
          }}
        >
          취소
        </Button>
        <Button
          onClick={handleReviewSubmit}
          color='primary'
          sx={{
            bgcolor: 'primary.main',
            color: 'var(--text-color)',
            ':hover': { bgcolor: 'primary.dark' },
          }}
          disabled={isLoading}
        >
          제출
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewModal;
