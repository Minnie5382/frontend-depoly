import React, { useState, useEffect } from 'react';
import FollowCard from './FollowCard';
import style from '../../UserInfoPage.module.css';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';

const FollowList = ({ data, title, followerRefetch, followingsRefetch }) => {
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (value) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [data]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = data.slice(startIndex, endIndex);

  const noDataMessage =
    title === '팔로워'
      ? '아직 팔로워가 없습니다!'
      : '아직 팔로잉 중인 사용자가 없습니다!';

  return (
    <div>
      <h2 className={style.title}>{title}</h2>
      <div className={style.cardContainer}>
        {dataToShow.length > 0 ? (
          dataToShow.map((item, index) => (
            <FollowCard
              key={index}
              {...item}
              followerRefetch={followerRefetch}
              followingsRefetch={followingsRefetch}
            />
          ))
        ) : (
          <p>{noDataMessage}</p>
        )}
      </div>
      {totalPages > 1 && (
        <PaginationComponent
          count={totalPages}
          page={page}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FollowList;
