import React, { useState } from 'react';
import { Button, TextField, Link } from '@mui/material';
import { useMutation } from 'react-query';
import { loginEmail, loginKakao } from '../../utils/auth';
import style from './SignIn.module.css';
import logo from '../../assets/logo2.png';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import { useUser } from '../../utils/UserContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const navigate = useNavigate();

  const { mutate: doLoginEmail, isLoading: isEmailLoading } = useMutation(
    loginEmail,
    {
      onSuccess: () => {
        axios
          .get('/auth/userInfo')
          .then((response) => {
            login(response.data);
            navigate('/');
          })
          .catch((error) => {
            alert(`사용자 정보를 불러오는 데 실패했습니다`);
          });
      },
      onError: (error) => {
        alert(`로그인에 실패하였습니다.`);
      },
    }
  );

  const handleEmailLogin = (event) => {
    event.preventDefault();
    doLoginEmail({ email, password });
  };

  const handleKakaoLoginClick = () => {
    window.location.href = loginKakao();
  };

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
        color: 'var(--text-color)',
      },
    },
  };

  return (
    <div className={style.pageContainer}>
      <img src={logo} alt='로고' className={style.logo} />
      <div className={style.signInContainer}>
        <span className={style.title}>로그인</span>
        <form className={style.form} onSubmit={handleEmailLogin}>
          <TextField
            label='이메일'
            type='email'
            variant='outlined'
            fullWidth
            required
            sx={textFieldTheme}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='비밀번호'
            type='password'
            fullWidth
            required
            sx={textFieldTheme}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{
              backgroundColor: 'var(--point-color)',
              color: 'var(--text-color)',
            }}
            disabled={isEmailLoading}
          >
            {isEmailLoading ? '처리 중...' : '로그인'}
          </Button>
          <Button
            variant='contained'
            fullWidth
            onClick={handleKakaoLoginClick}
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
