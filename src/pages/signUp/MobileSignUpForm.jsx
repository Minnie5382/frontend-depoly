import React from 'react';
import { Button, TextField, Stack } from '@mui/material';

const MobileSignUpForm = ({ inputTheme }) => {
  return (
    <>
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
      <TextField
        label='비밀번호'
        type='password'
        variant='outlined'
        fullWidth
        size='small'
        required
        sx={inputTheme}
      />
      <TextField
        label='비밀번호 확인'
        type='password'
        variant='outlined'
        fullWidth
        size='small'
        required
        sx={inputTheme}
      />
    </>
  );
};

export default MobileSignUpForm;
