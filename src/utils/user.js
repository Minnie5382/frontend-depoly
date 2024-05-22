import axios from './axiosInstance';

// 사용자 관련 API

/** 닉네임 중복검사 */
export const checkNicknameDuplication = nickname =>
  axios.post('/auth/nickname/check', nickname);

/** 유저 정보 */
export const getUserInfo = () => axios.get('auth/userInfo');

/** 유저 마이 페이지 조회 */
export const getMyPage = userID => axios.get(`/users/${userID}`);

/** 내 프로필 조회 */
export const getUserProfile = () => axios.get('/users/profile');

/** 내 프로필 수정 */
export const updateUserProfile = profileData =>
  axios.post('/users/profile/edit', profileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

/** 팔로워 목록 조회 */
export const getUserFollowers = (userID, page, size) =>
  axios.get(`/users/${userID}/followers`, {
    params: {
      page,
      size,
    },
  });

/** 팔로잉 목록 조회 */
export const getUserFollowings = (userID, page, size) =>
  axios.get(`/users/${userID}/followings`, {
    params: {
      page,
      size,
    },
  });

/** 팔로우 */
export const followUser = userId => axios.post(`/users/follow`, { userId });

/** 팔로우 취소 */
export const unfollowUser = userId =>
  axios.delete(`/users/follow`, { data: { userId } });

/** 신고하기 */
export const reportUser = reportData =>
  axios.post(`/users/report`, reportData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

/** 특정 유저의 컬렉션 조회 */
export const getUserReviews = userId => axios.get(`/users/${userId}/reviews`);

/** 특정 유저의 스크랩 목록 조회 */
export const getUserScraps = userId => axios.get(`/users/${userId}/scrap`);
