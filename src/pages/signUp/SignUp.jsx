import React, { useState } from 'react';
import { Link } from '@mui/material';
import style from './SignUp.module.css';
import logo from '../../assets/logo2.png';
import TermsDialog from './TermsDialog';
import EmailSignUpForm from './EmailSignUpForm';

const SignUp = () => {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  return (
    <div className={style.pageContainer}>
      <img src={logo} alt='로고' className={style.logo} />
      <div className={style.signUpContainer}>
        <span className={style.title}>회원가입</span>
        <EmailSignUpForm
          termsAgreed={termsAgreed}
          privacyAgreed={privacyAgreed}
        />
        <div className={style.signInPrompt}>
          <span>이미 아이디가 있으신가요?&nbsp;</span>
          <Link href='/signin' underline='none'>
            로그인 하러가기
          </Link>
        </div>
        <TermsDialog
          termsAgreed={termsAgreed}
          setTermsAgreed={setTermsAgreed}
          privacyAgreed={privacyAgreed}
          setPrivacyAgreed={setPrivacyAgreed}
        />
      </div>
    </div>
  );
};

export default SignUp;
