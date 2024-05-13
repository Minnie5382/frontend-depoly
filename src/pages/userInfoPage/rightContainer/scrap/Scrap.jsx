import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ScrapCard from './ScrapCard';
import style from '../../UserInfoPage.module.css';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';
import { getUserScraps } from '../../../../utils/user';

const Scrap = () => {
  const { userId } = useParams();

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ['userScraps', userId],
    () => getUserScraps(userId),
    {
      keepPreviousData: true,
    }
  );

  const itemsPerPage = 10;

  const result = data?.data?.result;
  const scraps = result.scrapList || [];
  const totalItems = result.totalScrapNum || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = scraps.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생!</div>;
  }

  return (
    <div>
      <h2 className={style.title}>스크랩</h2>
      <div className={style.scrapCardContainer}>
        {dataToShow.length > 0 ? (
          dataToShow.map((scrap, index) => (
            <ScrapCard
              key={index}
              poster={scrap.poster}
              title={scrap.title}
              movieId={scrap.movieId}
              releaseDate={scrap.releaseDate}
            />
          ))
        ) : (
          <p>아직 스크랩한 영화가 존재하지 않습니다! 스크랩해보세요!</p>
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

export default Scrap;
