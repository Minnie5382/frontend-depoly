import React from 'react';
import FollowList from './FollowList';
import { getUserFollowers } from '../../../../utils/user';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const Followers = () => {
  const { userID } = useParams();
  const {
    data: followerData,
    isLoading,
    isError,
  } = useQuery(['followers', userID], () => getUserFollowers(userID));

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
  ];

  if (isLoading) return <FollowList data={data} title='팔로워' />;
  if (isError) return <FollowList data={data} title='팔로워' />;

  return <FollowList data={followerData} title='팔로워' />;
};

export default Followers;
