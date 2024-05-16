import axios from './axiosInstance';

// 인증 관련 API

/** 회원가입 */
export const signup = (userData) =>
  axios.post('/auth/signup', userData, { withCredentials: false });

/** 이메일 로그인 */
export const loginEmail = (userData) =>
  axios.post('/auth/login/email', userData);

/** 이메일 중복검사 */
export const checkEmailDuplication = (email) =>
  axios.post('/auth/email/check', { email: email }, { withCredentials: false });

/** 이메일 인증 코드 발송 */
export const verifyEmail = (email) =>
  axios.post('/auth/verify/email', email, { withCredentials: false });

/** 이메일 인증 코드 확인 */
export const verifyEmailCheck = (verifyCode) =>
  axios.post('/auth/verify/email/check', verifyCode, {
    withCredentials: false,
  });

/** 카카오 로그인 */
export const loginKakao = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
};

/** 로그아웃 */
export const logout = () => axios.post('/auth/logout');

/** 권한 확인 */
export const authCheck = () => axios.get('/auth/user/check');

/** 회원 탈퇴 */
export const deleteAccount = () => axios.post('/user/delete');
