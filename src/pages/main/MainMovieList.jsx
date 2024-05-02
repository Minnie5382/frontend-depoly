import React, { useState } from 'react';
import style from './Main.module.css';
import {
  getDailyBoxOffice,
  getUpcomingMovies,
  getMoviesByGenre,
} from '../../utils/movie';
import MainMovie from './MainMovie';
import { useQuery } from 'react-query';

const MainMovieList = ({ title, apiName }) => {
  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery(['mainMovie'], () => getDailyBoxOffice());

  const data = [
    {
      movieId: 0,
      title: '어린왕자',
      releaseDate: '',
      poster: '',
      rank: 1,
      levelAvgScore: 0,
      cinephileAvgScore: 0,
    },
    {
      movieId: 0,
      title: '이솝우화',
      releaseDate: '',
      poster: '',
      rank: 2,
      levelAvgScore: 0,
      cinephileAvgScore: 0,
    },
    {
      movieId: 0,
      title: '백설공주',
      releaseDate: '',
      poster: '',
      rank: 3,
      levelAvgScore: 0,
      cinephileAvgScore: 0,
    },
  ];
  // if (isLoading) {
  //   // isLoading을 사용하여 데이터가 로딩중일 때 화면을 랜더링합니다.
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  return (
    <div className={style.movieContainer}>
      <h2>{title}</h2>
      <div className={style.movieBox}>
        <button className={style.moveLeftBtn}>〈</button>
        <div className={style.movieContainerInner}>
          {data.map((movieData) => (
            <MainMovie key={movieData.rank} {...movieData} />
          ))}
        </div>
        <button className={style.moveRightBtn}>〉</button>
      </div>
    </div>
  );
};

//   return (
//     <div className={style.movieContainer}>
//       <h2>{title}</h2>
//       <div className={style.movieBox}>
//         <button className={style.moveLeftBtn}>〈</button>
//         <div className={style.movieContainerInner}>
//           {/* {movieData.map((inData) => (
//             <MainMovie key={inData.rank} {...inData} />
//           ))} */}
//         </div>
//         <button className={style.moveRightBtn}>〉</button>
//       </div>
//     </div>
//   );
// };

export default MainMovieList;
