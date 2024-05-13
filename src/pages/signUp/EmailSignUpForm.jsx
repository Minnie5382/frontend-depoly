import React, { useEffect, useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { useMutation } from 'react-query';
import {
  signup,
  verifyEmail,
  verifyEmailCheck,
  checkEmailDuplication,
} from '../../utils/auth';
import { checkNicknameDuplication } from '../../utils/user';
import style from './SignUp.module.css';
import useDebounce from '../../utils/useDebounce';
import { useNavigate } from 'react-router-dom';

const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W]).{8,}$/;

const EmailSignUpForm = ({ termsAgreed, privacyAgreed }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    nickname: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  const [emailSent, setEmailSent] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [authentication, setAuthentication] = useState(false);

  const debouncedEmail = useDebounce(formData.email, 500);
  const debouncedNickname = useDebounce(formData.nickname, 500);

  const inputTheme = {
    '& .MuiInputLabel-root': { color: 'var(--text-color)' },
    '& .MuiFocused': { color: 'var(--point-color)' },
    '& .MuiInput-underline:after': { borderBottomColor: 'var(--text-color)' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'var(--text-color)' },
      '&:hover fieldset': { borderColor: 'var(--point-color)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--point-color)' },
      '& input': { color: 'var(--text-color)' },
    },
  };

  useEffect(() => {
    if (debouncedNickname && nicknameRegex.test(debouncedNickname)) {
      checkNicknameDuplication({ nickname: debouncedNickname })
        .then((response) => {
          if (!response.data.isSuccess) {
            setErrors((prev) => ({
              ...prev,
              nickname: `${response.data.message}`,
            }));
          } else {
            setErrors((prev) => ({ ...prev, nickname: '' }));
          }
        })
        .catch((error) => {
          setErrors((prev) => ({
            ...prev,
            nickname: `${error.response.data.message}`,
          }));
        });
    } else {
    }
  }, [debouncedNickname]);

  useEffect(() => {
    if (debouncedEmail && emailRegex.test(debouncedEmail)) {
      checkEmailDuplication(debouncedEmail)
        .then((response) => {
          if (!response.data.isSuccess) {
            setErrors((prev) => ({
              ...prev,
              email: `${response.data.message}`,
            }));
            setEmailValid(false);
          } else {
            setErrors((prev) => ({ ...prev, email: '' }));
            setEmailValid(true);
          }
        })
        .catch((error) => {
          setErrors((prev) => ({
            ...prev,
            email: `${error.response.data.message}`,
          }));
          setEmailValid(false);
        });
    } else {
      setEmailValid(false);
    }
  }, [debouncedEmail]);

  const { mutate: sendVerificationEmail } = useMutation(verifyEmail, {
    onSuccess: () => {
      setEmailSent(true);
      alert('인증 번호가 발송되었습니다.');
    },
    onError: () => {
      setEmailSent(false);
      alert(`인증 번호 발송 실패!`);
    },
  });

  const { mutate: checkVerificationCode, isLoading: isCheckingCode } =
    useMutation(verifyEmailCheck, {
      onSuccess: () => {
        setFormData((prev) => ({
          ...prev,
          verificationCode: '인증이 완료되었습니다!',
        }));
        setAuthentication(true);
      },
      onError: () => {
        setErrors((prev) => ({
          ...prev,
          verificationCode: `인증 번호 확인 실패!`,
        }));
        setAuthentication(false);
      },
    });

  const { mutate: doSignUp, isLoading } = useMutation(signup, {
    onSuccess: () => {
      alert('회원가입이 성공적으로 완료되었습니다.');
      navigate('/signin');
    },
    onError: () => {
      alert(`회원가입 실패하였습니다.`);
    },
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'nickname':
        return nicknameRegex.test(value)
          ? ''
          : '닉네임에는 특수문자를 사용할 수 없습니다.';
      case 'email':
        return emailRegex.test(value) ? '' : '올바른 이메일을 입력해주세요.';
      case 'verificationCode':
        return value ? '' : '인증번호를 입력해주세요.';
      case 'password':
        return passwordRegex.test(value)
          ? ''
          : '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!';
      case 'confirmPassword':
        return value === formData.password
          ? ''
          : '비밀번호가 일치하지 않습니다.';
      default:
        return '';
    }
  };

  const handleSendVerificationEmail = () => {
    if (emailValid) {
      sendVerificationEmail({ email: formData.email });
    } else {
      alert('이메일 중복 검사를 통과해야 합니다!');
    }
  };

  const handleCheckVerificationCode = () => {
    if (emailSent) {
      checkVerificationCode({
        email: formData.email,
        code: formData.verificationCode,
      });
    } else {
      alert('인증 번호 전송이 완료되지 않았습니다!');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!termsAgreed || !privacyAgreed) {
      alert('서비스 이용 약관 및 개인정보 수집에 동의해주세요.');
      return;
    }

    if (errors.nickname) {
      alert('닉네임 중복 검사를 통과해야 합니다! 닉네임을 확인해주세요!');
      return;
    }

    if (!emailValid) {
      alert('이메일 중복 검사를 통과해야 합니다!');
      return;
    }

    if (!authentication) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    if (errors.password) {
      alert(errors.password);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요!');
      return;
    }

    const signUpData = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      isauthentication: authentication,
    };

    doSignUp(signUpData);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <TextField
        name='nickname'
        label='닉네임'
        type='text'
        variant='outlined'
        fullWidth
        size='small'
        required
        sx={inputTheme}
        value={formData.nickname}
        error={!!errors.nickname}
        helperText={errors.nickname || ' '}
        onChange={handleChange}
        autoComplete='off'
      />
      <Stack direction='row' spacing={1} sx={{ minHeight: '56px' }}>
        <TextField
          name='email'
          label='이메일'
          type='email'
          variant='outlined'
          fullWidth
          required
          size='small'
          sx={inputTheme}
          value={formData.email}
          error={!!errors.email}
          helperText={errors.email || ' '}
          onChange={handleChange}
          autoComplete='off'
          InputProps={{
            readOnly: authentication,
          }}
        />
        <Button
          variant='contained'
          sx={{ height: '40px' }}
          onClick={handleSendVerificationEmail}
          disabled={isCheckingCode || authentication}
        >
          인증
        </Button>
      </Stack>
      <Stack direction='row' spacing={1} sx={{ minHeight: '56px' }}>
        <TextField
          name='verificationCode'
          label='인증번호 입력'
          type='text'
          variant='outlined'
          fullWidth
          size='small'
          required
          sx={inputTheme}
          value={formData.verificationCode}
          error={!!errors.verificationCode}
          helperText={
            authentication
              ? formData.verificationCode
              : errors.verificationCode || ' '
          }
          onChange={handleChange}
          readOnly={authentication}
          autoComplete='off'
        />
        <Button
          variant='contained'
          sx={{ height: '40px' }}
          onClick={handleCheckVerificationCode}
          disabled={isCheckingCode || authentication}
        >
          확인
        </Button>
      </Stack>
      <TextField
        name='password'
        label='비밀번호'
        type='password'
        variant='outlined'
        fullWidth
        size='small'
        required
        sx={inputTheme}
        value={formData.password}
        error={!!errors.password}
        helperText={errors.password || ' '}
        onChange={handleChange}
        autoComplete='off'
      />
      <TextField
        name='confirmPassword'
        label='비밀번호 확인'
        type='password'
        variant='outlined'
        fullWidth
        size='small'
        required
        sx={inputTheme}
        value={formData.confirmPassword}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword || ' '}
        onChange={handleChange}
        autoComplete='off'
      />
      <Button
        type='submit'
        variant='contained'
        fullWidth
        sx={{ height: '40px' }}
        disabled={isLoading}
      >
        {isLoading ? '처리 중...' : '회원가입'}
      </Button>
    </form>
  );
};

export default EmailSignUpForm;
