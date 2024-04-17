import React from 'react';
import FollowList from './FollowList';

const Following = () => {
  const followingData = [
    {
      profileImage: 'http://via.placeholder.com/130x130',
      followId: 1,
      level: 100,
      name: '김희석',
      isCertified: true,
      isFollowed: true,
    },

    {
      profileImage: 'http://via.placeholder.com/130x130',
      followId: 2,
      level: 20,
      name: '김예지',
      isCertified: false,
      isFollowed: false,
    },
  ];
  return <FollowList data={followingData} title='팔로잉' />;
};

export default Following;
