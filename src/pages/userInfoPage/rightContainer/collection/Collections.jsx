import React, { useState } from 'react';
import style from '../../UserInfoPage.module.css';
import CollectionCard from './CollectionCard';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserReviews } from '../../../../utils/user';

const Collections = () => {
  const { userId } = useParams();

  const { data, isError, isLoading } = useQuery(['userScraps', userId], () =>
    getUserReviews(userId)
  );

  // const collectionsData = data?.data || [];
  const collectionsData = [
    {
      nickname: 'user1234',
      name: '김희석',
      level: 100,
      profileImage: 'path/to/image1.jpg',
      content: '나는야 김희석.',
      star: 5,
      likeNumber: 120,
      movieTitle: '곡성',
      reviewId: 1,
    },
  ];

  const itemsPerPage = 9;
  const [page, setPage] = useState(1);
  const count = Math.ceil(collectionsData.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = collectionsData.slice(startIndex, endIndex);

  // if (isLoading) return <div>로딩중...</div>;
  // if (isError) return <div> 에러: {error.message}</div>;

  return (
    <div>
      <h2 className={style.title}>컬렉션</h2>
      <div className={style.cardContainer}>
        {dataToShow.map((data) => (
          <CollectionCard key={data.reviewId} {...data} />
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

export default Collections;
