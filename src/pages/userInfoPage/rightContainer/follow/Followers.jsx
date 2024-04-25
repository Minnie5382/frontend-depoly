import React from 'react';
import FollowList from './FollowList';

const Followers = () => {
  const followerData = [
    {
      profileImage: 'http://via.placeholder.com/130x130',
      userId: 1,
      level: 100,
      name: '김희석',
      isCertified: true,
      isFollowed: true,
    },
    {
      profileImage: 'http://via.placeholder.com/130x130',
      userId: 2,
      level: 50,
      name: '최재영',
      isCertified: false,
      isFollowed: true,
    },
    {
      profileImage: 'http://via.placeholder.com/130x130',
      userId: 3,
      level: 20,
      name: '김예지',
      isCertified: false,
      isFollowed: false,
    },
  ];

  return <FollowList data={followerData} title='팔로워' />;
};

export default Followers;
