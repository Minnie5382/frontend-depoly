import React from 'react';
import style from '../../UserInfoPage.module.css';
import FollowButton from '../../../../components/button/FollowButton';
import { useNavigate } from 'react-router-dom';

const FollowCard = ({
  userId,
  profileImage,
  level,
  nickname,
  isCertified,
  isBad,
  isFollowed,
  followingsRefetch,
  followerRefetch,
}) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/userInfo/${userId}`);
  };

  return (
    <div className={style.followCard}>
      <div className={style.profileSection}>
        <img
          src={profileImage}
          alt={`${nickname} profile`}
          className={style.profileImage}
        />
      </div>
      <div className={style.infoSection}>
        <span className={style.level}>Lv.{level}</span>
        <div className={style.nameAndIcon} onClick={handleUserClick}>
          <span className={style.name}>{nickname}</span>
          {isCertified && <span className={style.icon}>왕관</span>}
          {isBad && <span className={style.icon}>해골</span>}
        </div>
        <FollowButton
          isFollowed={isFollowed}
          userId={userId}
          followingsRefetch={followingsRefetch}
          followerRefetch={followerRefetch}
        />
      </div>
    </div>
  );
};

export default FollowCard;
