import React, { useState } from 'react';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Link,
} from '@mui/material';
import style from './SignUp.module.css';
import logo from '../../assets/logo2.png';
import MobileSignUpForm from './MobileSignUpForm';
import KakaoSignUpForm from './KakaoSignUpForm';

const SignUp = () => {
  const [signUpOption, setSignUpOption] = useState('kakao');
  const inputTheme = {
    '& .MuiInputLabel-root': { color: 'var(--text-color)' },
    '& .Mui-focused': { color: 'var(--point-color)' },
    '& .MuiInput-underline:after': { borderBottomColor: 'var(--text-color)' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'var(--text-color)' },
      '&:hover fieldset': { borderColor: 'var(--point-color)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--point-color)' },
      '& input': { color: 'var(--text-color)' },
    },
  };

  const handleSignUpOptionChange = (event) => {
    setSignUpOption(event.target.value);
  };

  return (
    <div className={style.pageContainer}>
      <img src={logo} alt='로고' className={style.logo} />
      <div className={style.signUpContainer}>
        <span className={style.title}>회원가입</span>
        <FormControl component='fieldset'>
          <FormLabel component='legend' sx={{ color: 'white' }}>
            가입 방식 선택
          </FormLabel>
          <RadioGroup
            row
            aria-label='signUpOption'
            name='signUpOption'
            value={signUpOption}
            onChange={handleSignUpOptionChange}
          >
            <FormControlLabel
              value='kakao'
              control={<Radio sx={{ color: 'white' }} />}
              label='카카오 계정으로 가입하기'
            />
            <FormControlLabel
              value='mobile'
              control={<Radio sx={{ color: 'white' }} />}
              label='모바일로 가입하기'
            />
          </RadioGroup>
        </FormControl>
        <form className={style.form}>
          {signUpOption === 'mobile' && (
            <MobileSignUpForm inputTheme={inputTheme} />
          )}
          {signUpOption === 'kakao' && (
            <KakaoSignUpForm inputTheme={inputTheme} />
          )}
          <Button
            variant='contained'
            fullWidth
            type='submit'
            sx={{ height: '40px' }}
          >
            회원가입
          </Button>
        </form>
        <div className={style.signInPrompt}>
          <span>이미 아이디가 있으신가요?&nbsp;</span>
          <Link href='/signin' underline='none'>
            로그인 하러가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
