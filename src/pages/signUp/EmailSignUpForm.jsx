import React, { useEffect, useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { useMutation } from 'react-query';
import {
  checkEmailDuplication,
  signup,
  verifyEmail,
  verifyEmailCheck,
} from '../../utils/auth';
import style from './SignUp.module.css';
import useDebounce from '../../utils/useDebounce';

const EmailSignUpForm = ({ termsAgreed, privacyAgreed }) => {
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

  const debouncedEmail = useDebounce(formData.email, 500);

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
    if (debouncedEmail && emailRegex.test(debouncedEmail)) {
      checkEmailDuplication(debouncedEmail)
        .then((response) => {
          console.log(response.data);
          if (!response.data.isSuccess) {
            setErrors((prev) => ({
              ...prev,
              email: '이미 사용중인 이메일입니다.',
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
            email: `이메일 중복 검사 실패! (${error.message})`,
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
    onError: (error) => {
      setEmailSent(false);
      alert(`인증 번호 발송 실패! : ${error.message}`);
    },
  });

  const { mutate: checkVerificationCode, isLoading: isCheckingCode } =
    useMutation(verifyEmailCheck, {
      onSuccess: () => {
        setFormData((prev) => ({
          ...prev,
          verificationCode: '인증이 완료되었습니다!',
        }));
      },
      onError: (error) => {
        setErrors((prev) => ({
          ...prev,
          verificationCode: `인증 번호 확인 실패! : ${error.message}`,
        }));
      },
    });

  const handleSendVerificationEmail = () => {
    if (emailValid) sendVerificationEmail({ email: formData.email });
    else {
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

  const { mutate: doSignUp, isLoading } = useMutation(signup, {
    onSuccess: () => {
      alert('회원가입이 성공적으로 완료되었습니다.');
    },
    onError: (error) => {
      alert(`회원가입 실패하였습니다. : ${error.message}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (termsAgreed && privacyAgreed && checkVerificationCode.isSuccess) {
      const signUpData = {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        isAuthentication: checkVerificationCode.isSuccess,
      };
      doSignUp(signUpData);
    } else {
      if (!checkVerificationCode.isSuccess) {
        alert('이메일 인증을 완료해주세요.');
      } else {
        alert('서비스 이용 약관 및 개인정보 수집에 동의해주세요.');
      }
    }
  };

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const validateField = (name, value) => {
    switch (name) {
      case 'nickname':
        const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
        return nicknameRegex.test(value)
          ? ''
          : '닉네임에는 특수문자를 사용할 수 없습니다.';
      case 'email':
        return emailRegex.test(value) ? '' : '올바른 이메일을 입력해주세요.';
      case 'verificationCode':
        return value ? '' : '인증번호를 입력해주세요.';
      case 'password':
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
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
            readOnly: checkVerificationCode.isSuccess,
          }}
        />
        <Button
          variant='contained'
          sx={{ height: '40px' }}
          onClick={handleSendVerificationEmail}
          disabled={isCheckingCode || checkVerificationCode.isSuccess}
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
            checkVerificationCode.isSuccess
              ? formData.verificationCode
              : errors.verificationCode || ' '
          }
          onChange={handleChange}
          readOnly={checkVerificationCode.isSuccess}
          autoComplete='off'
        />
        <Button
          variant='contained'
          sx={{ height: '40px' }}
          onClick={handleCheckVerificationCode}
          disabled={isCheckingCode || checkVerificationCode.isSuccess}
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
