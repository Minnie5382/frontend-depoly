import React from 'react';
import style from './HotReviewsPage.module.css';
import Review from '../../components/review/review';
import { useQuery } from 'react-query';
import { getHotReviews } from '../../utils/review';

const HotReviewsPage = () => {
  const {
    data: reveiwData,
    isLoading,
    isError,
  } = useQuery(['hotReview'], () => getHotReviews(3));

  const data = [
    {
      reviewId: 231,
      moviePoster: '',
      movieName: '어바웃타임',
      reviewer: '홍길동',
      star: 0,
      content: '어쩌구저쩌구',
      like: 0,
      // reviewId: data.result.reviewId,
      // moviePoster: data.result.moviePoster,
      // movieName: data.result.movieTitle,
      // reviewer: data.result.reviewWriterNickname,
      // star: 1,
      // content: data.result.reviewContent,
      // like: data.result.likeNumber,
    },
    {
      reviewId: 123,
      moviePoster: '',
      movieName: '어바웃타임',
      reviewer: '홍길동',
      star: 0,
      content: '어쩌구저쩌구',
      like: 0,
    },
    {
      reviewId: '',
      moviePoster: '',
      movieName: '',
      reviewer: '',
      star: 0,
      content: '',
      like: 0,
    },
  ];
  return (
    <div className={style.container}>
      <div className={style.contentsContainer}>
        <div className={style.reviewsContainer}>
          <div className={style.title}>
            <h4>최근 인기 평론</h4>
            <h4>15+</h4>
          </div>
          <div className={style.reviewBox}>
            {/* map */}
            {data.map((reveiwData, index) => (
              <Review key={index} {...reveiwData} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotReviewsPage;
