import axios from './axiosInstance';

// 리뷰 관련 API

/** 평론 작성 */
export const createReview = (reviewData) =>
  axios.post('/reviews/create', reviewData);

/** 평론 수정 */
export const editReview = (reviewId, reviewData) =>
  axios.post(`/reviews/${reviewId}/edit`, reviewData);

/** 평론 삭제 */
export const deleteReview = (reviewId) => axios.delete(`/reviews/${reviewId}`);

/** 해당 영화 평론 목록 조회 */
export const getReviewsByMovieId = (movieId, page, size) =>
  axios.get(
    `/reviews/${movieId}`,
    { params: { page, size } },
    { withCredentials: false }
  );

/** 특정 유저의 모든 평론 목록 조회 */
export const getReviewsByUserNickname = (nickname) =>
  axios.get(`/reviews/users/${nickname}`, { withCredentials: false });

/** 평론 좋아요 */
export const likeReview = (reviewId) =>
  axios.post(`/reviews/${reviewId}/likes`);

/** 평론 좋아요 취소 */
export const unlikeReview = (reviewId) =>
  axios.delete(`/reviews/${reviewId}/likes`);
