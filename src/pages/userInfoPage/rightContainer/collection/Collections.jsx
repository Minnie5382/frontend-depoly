import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CollectionCard from './CollectionCard';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';
import style from '../../UserInfoPage.module.css';
import { getUserReviews } from '../../../../utils/user';

const Collections = () => {
  const { userId } = useParams();

  const [page, setPage] = useState(1);

  const { data, isError, isLoading, refetch } = useQuery(
    ['userCollections', userId],
    () => getUserReviews(userId),
    {
      keepPreviousData: true,
    }
  );

  const result = data?.data?.result;
  const collectionsData = result?.collection || [];
  const totalItems = result?.totalCollectionNum || 0;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (value) => {
    setPage(value);
  };

  const collectionRefetch = () => {
    refetch();
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = collectionsData.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>로딩 중... </div>;
  }

  if (isError) {
    return <div>에러 발생!</div>;
  }

  return (
    <div>
      <h2 className={style.title}>컬렉션</h2>
      <div className={style.cardContainer}>
        {dataToShow.length > 0 ? (
          dataToShow.map((data) => (
            <CollectionCard
              key={data.reviewId}
              {...data}
              collectionRefetch={collectionRefetch}
            />
          ))
        ) : (
          <p>아직 작성된 평론이 존재하지 않습니다! 평론을 작성해보세요!</p>
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

export default Collections;
