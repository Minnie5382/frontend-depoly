import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ count, page, onChange }) => {
  return (
    <Stack spacing={2} alignItems='center' sx={{ margin: '20px 0 0' }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color='primary'
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'var(--text-color)',
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
