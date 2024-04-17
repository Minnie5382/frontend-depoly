import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FollowCard from './FollowCard';
import style from '../../MyPage.module.css';

const FollowList = ({ data, title }) => {
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);
  const count = Math.ceil(data.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const dataToShow = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <h2 className={style.title}>{title}</h2>
      <div className={style.cardContainer}>
        {dataToShow.map((item) => (
          <FollowCard key={item.followId} {...item} />
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

export default FollowList;
