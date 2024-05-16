import axios from './axiosInstance';

// 리뷰 관련 API

/** 별점 남기기 및 수정 */
export const createOrUpdateScore = (scoreData) =>
  axios.post('/score/movie', scoreData);

/** 평론 작성 */
export const createReview = (reviewData) =>
  axios.post('/reviews/create', reviewData);

/** 평론 수정 */
export const editReview = (reviewId, reviewData) =>
  axios.post(`/reviews/${reviewId}/edit`, reviewData);

/** 평론 삭제 */
export const deleteReview = (reviewId) =>
  axios.delete(`/reviews/${reviewId}/delete`);

/** 해당 영화 평론 목록 조회 */
export const getReviewsByMovieId = (movieId, page, size) =>
  axios.get(
    `/reviews/${movieId}`,
    { params: { page, size } },
    { withCredentials: false }
  );

/** 평론 좋아요 */
export const likeReview = (reviewId) =>
  axios.post(`/reviews/${reviewId}/likes`);

/** 평론 좋아요 취소 */
export const unlikeReview = (reviewId) =>
  axios.delete(`/reviews/${reviewId}/likes`);

/** 인기 평론 리스트 조회 */
export const getHotReviews = (page = 0, size = 10) =>
  axios.get(
    `/reviews/hot`,
    { params: { page, size } },
    { withCredentials: false }
  );
