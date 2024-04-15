import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 리뷰 관련 API

/** 평론 작성 */
export const createReview = (reviewData) =>
  axios.post(`${API_URL}/reviews/create`, reviewData);

/** 평론 수정 */
export const editReview = (reviewId, reviewData) =>
  axios.post(`${API_URL}/reviews/${reviewId}/edit`, reviewData);

/** 평론 삭제 */
export const deleteReview = (reviewId) =>
  axios.delete(`${API_URL}/reviews/${reviewId}`);

/** 해당 영화 평론 목록 조회 */
export const getReviewsByMovieId = (movieId, page, size) =>
  axios.get(`${API_URL}/reviews/${movieId}`, { params: { page, size } });

/** 특정 유저의 모든 평론 목록 조회 */
export const getReviewsByUserNickname = (nickname) =>
  axios.get(`${API_URL}/reviews/users/${nickname}`);

/** 평론 좋아요 */
export const likeReview = (reviewId) =>
  axios.post(`${API_URL}/reviews/${reviewId}/likes`);

/** 평론 좋아요 취소 */
export const unlikeReview = (reviewId) =>
  axios.delete(`${API_URL}/reviews/${reviewId}/likes`);
