import React, { useState } from 'react';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  Checkbox,
  Box,
  Typography,
  Link,
} from '@mui/material';
import style from './SignUp.module.css';
import logo from '../../assets/logo2.png';
import MobileSignUpForm from './MobileSignUpForm';
import KakaoSignUpForm from './KakaoSignUpForm';

const SignUp = () => {
  const [signUpOption, setSignUpOption] = useState('kakao');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

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
        {termsAgreed && privacyAgreed && (
          <form className={style.form}>
            {signUpOption === 'mobile' ? (
              <MobileSignUpForm inputTheme={inputTheme} />
            ) : (
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
        )}
        <div className={style.signInPrompt}>
          <span>이미 아이디가 있으신가요?&nbsp;</span>
          <Link href='/signin' underline='none'>
            로그인 하러가기
          </Link>
        </div>
      </div>
      <Dialog
        open={!termsAgreed || !privacyAgreed}
        id='dialog'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor: 'var(--background-color)',
            color: 'var(--text-color)',
          }}
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
              서비스 이용 약관 내용 추가하기
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
    </div>
  );
};

export default SignUp;
