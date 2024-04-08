import React from 'react';
import MovieReview from '../../components/movieReview/MovieReview';
import style from './MovieReviews.module.css';
import Header from '../../components/header/Header';

const reviews = [
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
  {
    id: 1,
    name: '홍길동',
    level: 13,
    profileImage: '',
    isCertified: false,
    isBad: false,
    content: '아아 어쩌구 저쩌구 리뷰 테스트 중',
    star: 3.5,
    likeNumber: 34,
    createdAt: '2024-03-12 11:30',
    isLiked: true,
  },
];

const MovieReviews = () => {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.reviewContainer}>
        <div className={style.topSection}>
          <span>평론 모아보기</span>
          <span>{reviews.length} + </span>
        </div>
        <div className={style.reviewsList}>
          {reviews.map((review) => (
            <MovieReview key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieReviews;
