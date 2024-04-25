import React from 'react';
import style from './FollowButton.module.css';
import { useMutation } from 'react-query';
import { followUser, unfollowUser } from '../../utils/user';

const FollowButton = ({ userId, isFollowed }) => {
  const { mutate } = useMutation(() =>
    isFollowed ? unfollowUser(userId) : followUser(userId)
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
    >
      {isFollowed ? '팔로우 취소' : '팔로우'}
    </button>
  );
};

export default FollowButton;
