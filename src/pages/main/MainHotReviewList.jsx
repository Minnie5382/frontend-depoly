import React, { useEffect, useState } from 'react';
import style from './Main.module.css';
import HotReview from '../../components/hotReview/HotReview';
import { useQuery } from 'react-query';
import { getHotReviews } from '../../utils/review';

const MainHotReviewList = () => {
  // const {
  //   data: reveiwData,
  //   isLoading,
  //   isError,
  // } = useQuery(['mainReview'], () => getHotReviews(5));

  const data = [
    {
      reviewId: 121,
      moviePoster: '',
      movieName: '어바웃타임',
      reviewer: '홍길동',
      star: 0,
      content: '어쩌구저쩌구',
      like: 0,
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
  ];

  // if (isLoading) {
  //   // isLoading을 사용하여 데이터가 로딩중일 때 화면을 랜더링합니다.
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  // isError를 사용하여 error가 발생할 때 화면을 랜더링합니다.
  return (
    <div className={style.reviewContainer}>
      <h2>최신 인기 평론</h2>
      <div className={style.reviewBox}>
        <button className={style.moveLeftBtn}>〈</button>
        <div className={style.reviewContainerInner}>
          {data.map((inData, index) => (
            <HotReview key={index} {...inData} />
          ))}
          <HotReview />
        </div>
        <button className={style.moveRightBtn}>〉</button>
      </div>
    </div>
  );
};

//   return (
//     <div className={style.reviewContainer}>
//       <h2>최신 인기 평론</h2>
//       <div className={style.reviewBox}>
//         <button className={style.moveLeftBtn}>〈</button>
//         <div className={style.reviewContainerInner}>
//           {reveiwData.map((inData, index) => (
//             <HotReview key={index} {...inData} />
//           ))}
//         </div>
//         <button className={style.moveRightBtn}>〉</button>
//       </div>
//     </div>
//   );
// };
export default MainHotReviewList;
