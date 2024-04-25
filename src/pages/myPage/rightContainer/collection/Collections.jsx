import React, { useState } from 'react';
import style from '../../MyPage.module.css';
import CollectionCard from './CollectionCard';
import PaginationComponent from '../../../../components/pagination/PaginationComponent';

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

  return (
    <div>
      <h2 className={style.title}>컬렉션</h2>
      <div className={style.cardContainer}>
        {dataToShow.map((data) => (
          <CollectionCard key={data.reviewId} {...data} />
        ))}
      </div>
      <PaginationComponent count={count} page={page} onChange={handleChange} />
    </div>
  );
};

export default Collections;
