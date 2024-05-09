import React, { useState } from 'react';
import style from '../../UserInfoPage.module.css';
import CollectionCard from './CollectionCard';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserReviews } from '../../../../utils/user';

const Collections = () => {
  const { userId } = useParams();

  const { data, isError, isLoading, refetch } = useQuery(
    ['userScraps', userId],
    () => getUserReviews(userId)
  );

  const collectionsData = data?.data?.result?.collection || [];
  const totalPages = data?.data?.result?.totalPageNum || 0;
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const collectionRefetch = () => {
    refetch();
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = collectionsData.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생!</div>;
  }

  return (
    <div>
      <h2 className={style.title}>컬렉션</h2>
      <div className={style.cardContainer}>
        {dataToShow.map((data) => (
          <CollectionCard
            key={data.reviewId}
            {...data}
            collectionRefetch={collectionRefetch}
          />
        ))}
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

export default Collections;
