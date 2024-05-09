import React from 'react';
import FollowList from './FollowList';
import { getUserFollowers } from '../../../../utils/user';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const Followers = () => {
  const { userId } = useParams();
  const { data: followerData, refetch } = useQuery(['followers', userId], () =>
    getUserFollowers(userId)
  );

  const followerRefetch = () => {
    refetch();
  };

  return (
    <FollowList
      data={followerData?.data.result.followList || []}
      followerRefetch={followerRefetch}
      title='팔로워'
    />
  );
};

export default Followers;
