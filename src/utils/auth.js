import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 인증 관련 API

/** 회원가입 */
export const signup = (userData) =>
  axios.post(`${API_URL}/auth/signup`, userData);

/** 이메일 로그인 */
export const loginEmail = (userData) =>
  axios.post(`${API_URL}/auth/login/email`, userData);

/** 카카오 로그인 */
export const loginKakao = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
};

/** 이메일 인증 코드 발송 */
export const verifyEmail = (email) =>
  axios.post(`${API_URL}/auth/verify/email`, email);

/** 이메일 인증 코드 확인 */
export const verifyEmailCheck = (verifyCode) =>
  axios.post(`${API_URL}/auth/verify/email/check`, verifyCode);
