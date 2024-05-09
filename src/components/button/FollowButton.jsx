import React, { useState } from 'react';
import style from './FollowButton.module.css';
import { useMutation } from 'react-query';
import { followUser, unfollowUser } from '../../utils/user';

const FollowButton = ({
  userId,
  followingsRefetch,
  followerRefetch,
  isFollowed: initialFollowed,
}) => {
  const [isFollowed, setIsFollowed] = useState(initialFollowed);

  const { mutate, isLoading } = useMutation(
    () => (isFollowed ? unfollowUser(userId) : followUser(userId)),
    {
      onSuccess: () => {
        setIsFollowed(!isFollowed);
        followerRefetch();
        followingsRefetch();
      },
    }
  );

  const handleToggleFollow = () => {
    mutate();
  };

  const buttonStyle = isFollowed
    ? style.followBtnUnfollow
    : style.followBtnFollow;

  return (
    <button
      onClick={handleToggleFollow}
      className={`${style.followBtn} ${buttonStyle}`}
      disabled={isLoading}
    >
      {isFollowed ? '팔로우 취소' : '팔로우'}
    </button>
  );
};

export default FollowButton;
