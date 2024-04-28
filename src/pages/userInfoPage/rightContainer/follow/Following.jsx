import React from 'react';
import FollowList from './FollowList';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserFollowings } from '../../../../utils/user';

const Following = () => {
  const { userID } = useParams();
  const {
    data: followingData,
    isLoading,
    isError,
  } = useQuery(['followings', userID], () => getUserFollowings(userID));

  const data = [
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

  if (isLoading) return <FollowList data={data} title='팔로잉' />;
  if (isError) return <FollowList data={data} title='팔로잉' />;

  return <FollowList data={followingData?.result || data} title='팔로잉' />;
};

export default Following;
