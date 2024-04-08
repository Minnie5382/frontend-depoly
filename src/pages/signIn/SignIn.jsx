import React from 'react';
import { Button, TextField, Link } from '@mui/material';
import style from './SignIn.module.css';
import logo from '../../assets/logo.png';

const SignIn = () => {
  return (
    <div className={style.pageContainer}>
      <img src={logo} alt='로고' />
      <div className={style.signInContainer}>
        <span className={style.title}>로그인</span>
        <form className={style.form}>
          <TextField
            label='이메일'
            type='email'
            variant='outlined'
            fullWidth
            required
            sx={{
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
            }}
          />

          <TextField
            label='비밀번호'
            type='password'
            fullWidth
            required
            className={style.textField}
            sx={{
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
            }}
          />

          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{
              backgroundColor: 'var(--point-color)',
              color: 'var(--text-color)',
              '&:hover': {},
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
              '&:hover': {},
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
