import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ScrapCard from './ScrapCard';
import style from '../../MyPage.module.css';

const Scrap = () => {
  const scraps = [
    {
      poster: 'http://via.placeholder.com/160x230',
      title: '쿵푸팬더4',
      movieId: '001',
      releaseDate: '2024',
    },
    {
      poster: 'http://via.placeholder.com/160x230',
      title: '어벤져스',
      movieId: '002',
      releaseDate: '2022',
    },
    {
      poster: 'http://via.placeholder.com/160x230',
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

  const dataToShow = scraps.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <h2 className={style.title}>스크랩</h2>
      <div className={style.scrapCardContainer}>
        {dataToShow.map((scrap, index) => (
          <ScrapCard
            key={scrap.movieId}
            poster={scrap.poster}
            title={scrap.title}
            movieId={scrap.movieId}
            releaseDate={scrap.releaseDate}
          />
        ))}
      </div>
      <Stack spacing={2} alignItems='center' sx={{ margin: '20px 0' }}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color='primary'
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'var(--text-color)',
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default Scrap;
