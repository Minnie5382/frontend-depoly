import React from 'react';
import { Button, TextField, Stack } from '@mui/material';

const KakaoSignUpForm = ({ inputTheme }) => {
  return (
    <>
      <Button
        variant='contained'
        fullWidth
        sx={{
          height: '40px',
          background: 'var(--kakao-login)',
          color: '#000',
          '&:hover': {
            background: 'var(--kakao-login)',
          },
        }}
      >
        카카오 계정 인증하기
      </Button>
      <TextField
        label='이름'
        type='text'
        variant='outlined'
        fullWidth
        size='small'
        required
        sx={inputTheme}
      />
      <Stack direction='row' spacing={1}>
        <TextField
          label='휴대폰 번호'
          type='text'
          variant='outlined'
          fullWidth
          required
          size='small'
          sx={inputTheme}
        />
        <Button variant='contained'>인증</Button>
      </Stack>
      <Stack direction='row' spacing={1}>
        <TextField
          label='인증번호 입력'
          type='text'
          variant='outlined'
          fullWidth
          size='small'
          required
          sx={inputTheme}
        />
        <Button variant='contained'>확인</Button>
      </Stack>
    </>
  );
};

export default KakaoSignUpForm;
