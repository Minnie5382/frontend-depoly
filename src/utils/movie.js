import axios from './axiosInstance';

// 영화 관련 API

/** 영화 목록 조회(검색, 주제별 목록 포함) */
export const searchMovies = (query, page = 0, size = 20) =>
  axios.get(
    '/movies/search',
    { params: { q: query, page, size } },
    { withCredentials: false }
  );

/** 영화 상세페이지 조회 */
export const moviesDetail = (movieId) => axios.get(`/movies/${movieId}`);

/** 영화 스크랩 */
export const likeMovie = (movieId) => axios.post(`/movies/${movieId}/likes`);

/** 영화 스크랩 취소 */
export const unlikeMovie = (movieId) =>
  axios.delete(`/movies/${movieId}/likes`);

/** 특정 유저의 좋아요한 영화 목록 조회 */
export const getUserMovies = (nickname) => axios.get(`/movies/${nickname}`);

/** 일간 박스오피스 영화 목록 조회 */
export const getDailyBoxOffice = () => axios.get('/movies/boxOffice');

/** 장르별 랜덤 영화 목록 조회 */
export const getMoviesByGenre = (genre) =>
  axios.get(`/movies/genre`, { params: { genre } });

/** 개봉 예정 영화 목록 조회 */
export const getUpcomingMovies = () => axios.get('/movies/upcoming');
