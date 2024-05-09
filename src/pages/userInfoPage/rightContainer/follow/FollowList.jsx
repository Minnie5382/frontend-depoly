import React, { useState } from 'react';
import FollowCard from './FollowCard';
import style from '../../UserInfoPage.module.css';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';

const FollowList = ({ data, title, followerRefetch, followingsRefetch }) => {
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);
  const count = Math.ceil(data.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = data.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className={style.title}>{title}</h2>
      <div className={style.cardContainer}>
        {dataToShow.map((item, index) => (
          <FollowCard
            key={index}
            {...item}
            data={data}
            followerRefetch={followerRefetch}
            followingsRefetch={followingsRefetch}
          />
        ))}
      </div>
      {count > 1 && (
        <PaginationComponent
          count={count}
          page={page}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FollowList;
