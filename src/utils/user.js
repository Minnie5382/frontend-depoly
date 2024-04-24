import axios from './axiosInstance';

// 사용자 관련 API
/** 유저 마이 페이지 조회 */
export const getMyPage = (nickname) => axios.get(`/users/${nickname}`);

/** 내 프로필 조회 */
export const getUserProfile = () => axios.get('/users/profile');

/** 내 프로필 수정 */
export const updateUserProfile = (profileData) =>
  axios.post('/users/profile', profileData);

/** 팔로워 목록 조회 */
export const getUserFollowers = (nickname) =>
  axios.get(`/users/${nickname}/followers`);

/** 팔로잉 목록 조회 */
export const getUserFollowings = (nickname) =>
  axios.get(`/users/${nickname}/followings`);

/** 팔로우 */
export const followUser = (userId) => axios.post(`/users/follow`, { userId });

/** 팔로우 취소 */
export const unfollowUser = (userId) =>
  axios.delete(`/users/follow`, { data: { userId } });

/** 신고하기 */
export const reportUser = (reportData) =>
  axios.post(`/users/report`, reportData);
