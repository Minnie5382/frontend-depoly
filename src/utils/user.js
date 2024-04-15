import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 사용자 관련 API
/** 유저 마이 페이지 조회 */
export const getMyPage = (nickname) =>
  axios.get(`${API_URL}/users/${nickname}`);

/** 내 프로필 조회 */
export const getUserProfile = () => axios.get(`${API_URL}/users/profile`);

/** 내 프로필 수정 */
export const updateUserProfile = (profileData) =>
  axios.post(`${API_URL}/users/profile`, profileData);

/** 팔로워 목록 조회 */
export const getUserFollowers = (nickname) =>
  axios.get(`${API_URL}/users/${nickname}/followers`);

/** 팔로잉 목록 조회 */
export const getUserFollowings = (nickname) =>
  axios.get(`${API_URL}/users/${nickname}/followings`);

/** 팔로우 */
export const followUser = (userId) =>
  axios.post(`${API_URL}/users/follow`, { userId });

/** 팔로우 취소 */
export const unfollowUser = (userId) =>
  axios.delete(`${API_URL}/users/follow`, { data: { userId } });

/** 신고하기 */
export const reportUser = (reportData) =>
  axios.post(`${API_URL}/users/report`, reportData);
