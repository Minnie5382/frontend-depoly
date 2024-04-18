import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from '@mui/material';

const TermsDialog = ({
  termsAgreed,
  setTermsAgreed,
  privacyAgreed,
  setPrivacyAgreed,
}) => {
  return (
    <Dialog open={!termsAgreed || !privacyAgreed} maxWidth='sm' fullWidth>
      <DialogTitle
        sx={{ bgcolor: 'var(--background-color)', color: 'var(--text-color)' }}
      >
        서비스 이용약관 및 개인정보 수집 동의
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'var(--background-color)' }}>
        <Box
          sx={{
            maxHeight: 150,
            overflow: 'auto',
            typography: 'body2',
            bgcolor: 'var(--sub-color)',
            color: 'var(--text-color)',
            padding: '10px',
          }}
        >
          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ color: 'var(--text-color)' }}
          >
            서비스 이용약관
          </Typography>
          <Typography paragraph sx={{ color: 'var(--text-color)' }}>
            서비스 이용약관 추가하기
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              sx={{ color: 'var(--text-color)' }}
            />
          }
          label='서비스 이용약관에 동의합니다.'
          sx={{ color: 'var(--text-color)' }}
        />
        <Box
          sx={{
            maxHeight: 150,
            overflow: 'auto',
            typography: 'body2',
            bgcolor: 'var(--sub-color)',
            padding: '10px',
          }}
        >
          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ color: 'var(--text-color)' }}
          >
            개인 정보 수집 및 이용
          </Typography>
          <Typography paragraph sx={{ color: 'var(--text-color)' }}>
            개인 정보 수집 및 이용 내용 추가하기
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              sx={{ color: 'var(--text-color)' }}
            />
          }
          label='개인정보 수집 및 이용에 동의합니다.'
          sx={{ color: 'var(--text-color)' }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
