import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ScrapCard from './ScrapCard';
import style from '../../UserInfoPage.module.css';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';
import { getUserScraps } from '../../../../utils/user';

const Scrap = () => {
  const { userId } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ['getUserScraps', userId],
    () => getUserScraps(userId),
    {
      keepPreviousData: true,
    }
  );

  const scraps = data?.data?.result.scrapList || [];

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const count = Math.ceil((scraps?.length || 0) / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = (scraps || []).slice(startIndex, endIndex);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러! : {error.message}</div>;

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

export default Scrap;
