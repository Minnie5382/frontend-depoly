import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 영화 관련 API

/** 영화 목록 조회(검색, 주제별 목록 포함) */
export const searchMovies = (query, page, size) =>
  axios.get(`${API_URL}/movies/search`, { params: { q: query, page, size } });

/** 영화 상세페이지 조회 */
export const moviesDetail = (movieId) =>
  axios.post(`${API_URL}/movies/${movieId}/`);

/** 영화 스크랩 */
export const likeMovie = (movieId) =>
  axios.post(`${API_URL}/movies/${movieId}/likes`);

/** 영화 스크랩 취소 */
export const unlikeMovie = (movieId) =>
  axios.delete(`${API_URL}/movies/${movieId}/likes`);

/** 특정 유저의 좋아요한 영화 목록 조회 */
export const getUserMovies = (nickname) =>
  axios.get(`${API_URL}/movies/${nickname}`);
