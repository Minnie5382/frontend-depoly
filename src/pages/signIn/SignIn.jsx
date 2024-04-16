import React from 'react';
import { Button, TextField, Link } from '@mui/material';
import style from './SignIn.module.css';
import logo from '../../assets/logo2.png';

const SignIn = () => {
  const textFieldTheme = {
    '& .MuiInputLabel-root': {
      color: 'var(--text-color)',
    },
    '& .Mui-focused': {
      color: 'var(--point-color)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--text-color)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--text-color)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--point-color)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--point-color)',
      },
      '& input': {
        color: '#fff',
      },
    },
  };

  return (
    <div className={style.pageContainer}>
      <img src={logo} alt='로고' className={style.logo} />
      <div className={style.signInContainer}>
        <span className={style.title}>로그인</span>
        <form className={style.form}>
          <TextField
            label='휴대폰 번호'
            type='text'
            variant='outlined'
            fullWidth
            required
            sx={textFieldTheme}
          />

          <TextField
            label='비밀번호'
            type='password'
            fullWidth
            required
            className={style.textField}
            sx={textFieldTheme}
          />

          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{
              backgroundColor: 'var(--point-color)',
              color: 'var(--text-color)',
            }}
          >
            로그인
          </Button>
          <Button
            variant='contained'
            fullWidth
            sx={{
              backgroundColor: 'var(--kakao-login)',
              color: 'black',
              '&:hover': { backgroundColor: 'var(--kakao-login)' },
            }}
          >
            카카오로 로그인
          </Button>
          <div className={style.signUpPrompt}>
            <span>계정이 없으신가요?&nbsp;&nbsp;</span>
            <Link href='/signup' underline='none' className={style.signUpLink}>
              회원가입 하러가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
