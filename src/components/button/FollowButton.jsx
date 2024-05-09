import React, { useState } from 'react';
import style from './FollowButton.module.css';
import { useMutation } from 'react-query';
import { followUser, unfollowUser } from '../../utils/user';
import { useUser } from '../../utils/UserContext';

const FollowButton = ({
  userId,
  followingsRefetch,
  followerRefetch,
  isFollowed: initialFollowed,
}) => {
  const [isFollowed, setIsFollowed] = useState(initialFollowed);
  const { user } = useUser();

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
    if (userId !== user.result.userId) {
      mutate();
    } else {
      alert('나 자신은 영원한 인생의 친구입니다.');
    }
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
