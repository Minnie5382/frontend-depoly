import React from 'react';
import FollowList from './FollowList';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserFollowings } from '../../../../utils/user';

const Following = () => {
  const { userId } = useParams();
  const { data: followingData, refetch } = useQuery(
    ['followings', userId],
    () => getUserFollowings(userId)
  );

  const followingsRefetch = () => {
    refetch();
  };

  return (
    <FollowList
      data={followingData?.data.result.followList || []}
      title='팔로잉'
      followingsRefetch={followingsRefetch}
    />
  );
};

export default Following;
