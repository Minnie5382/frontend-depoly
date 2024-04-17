import React, { useState } from 'react';
import style from '../../MyPage.module.css';
import CollectionCard from './CollectionCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Collections = () => {
  const collectionsData = [
    {
      nickname: 'user1234',
      name: '김희석',
      level: 100,
      profileImage: 'path/to/image1.jpg',
      content: '나는야 김희석.',
      star: 5,
      likeNumber: 120,
      createdAt: '2024-04-17',
    },
  ];

  const itemsPerPage = 9;
  const [page, setPage] = useState(1);
  const count = Math.ceil(collectionsData.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // 페이지의 첫 번째 요소 인덱스, 마지막 요소 인덱스 계산
  const dataToShow = collectionsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <h2 className={style.title}>컬렉션</h2>
      <div className={style.cardContainer}>
        {dataToShow.map((data, index) => (
          <CollectionCard key={index} {...data} />
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

export default Collections;
