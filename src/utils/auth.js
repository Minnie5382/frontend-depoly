import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 인증 관련 API

/** 회원가입 */
export const signup = (userData) =>
  axios.post(`${API_URL}/auth/signup`, userData);

/** 모바일 로그인 */
export const loginMobile = (userData) =>
  axios.post(`${API_URL}/auth/login/mobile`, userData);

/** 카카오 로그인 */
export const loginKakao = (userData) =>
  axios.post(`${API_URL}/auth/login/kakao`, userData);

/** 모바일 인증 코드 발송 */
export const verifyMobile = (verificationData) =>
  axios.post(`${API_URL}/auth/verify/mobile`, verificationData);

/** 카카오 회원인증 */
export const verifyKakao = (verificationData) =>
  axios.post(`${API_URL}/auth/verify/kakao`, verificationData);
