import React, { useState } from 'react';
import ScrapCard from './ScrapCard';
import style from '../../MyPage.module.css';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';

const Scrap = () => {
  const scraps = [
    {
      poster: 'http://via.placeholder.com/170x230',
      title: '쿵푸팬더4',
      movieId: '001',
      releaseDate: '2024',
    },
    {
      poster: 'http://via.placeholder.com/170x230',
      title: '어벤져스',
      movieId: '002',
      releaseDate: '2022',
    },
    {
      poster: 'http://via.placeholder.com/170x230',
      title: '인셉션',
      movieId: '003',
      releaseDate: '2023',
    },
  ];

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const count = Math.ceil(scraps.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = scraps.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className={style.title}>스크랩</h2>
      <div className={style.scrapCardContainer}>
        {dataToShow.map((scrap, index) => (
          <ScrapCard
            key={index}
            poster={scrap.poster}
            title={scrap.title}
            movieId={scrap.movieId}
            releaseDate={scrap.releaseDate}
          />
        ))}
      </div>
      <PaginationComponent count={count} page={page} onChange={handleChange} />
    </div>
  );
};

export default Scrap;
