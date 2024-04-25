import React from 'react';
import style from '../../MyPage.module.css';
import FollowButton from '../../../../components/button/FollowButton';

const FollowCard = ({
  userId,
  profileImage,
  level,
  name,
  isCertified,
  isFollowed,
}) => {
  return (
    <div className={style.followCard}>
      <div className={style.profileSection}>
        <img
          src={profileImage}
          alt={`${name} profile`}
          className={style.profileImage}
        />
      </div>
      <div className={style.infoSection}>
        <span className={style.level}>Lv.{level}</span>
        <div className={style.nameAndIcon}>
          <span className={style.name}>{name}</span>
          {isCertified && <span className={style.icon}>왕관</span>}
        </div>
        <FollowButton isFollowed={isFollowed} userId={userId} />
      </div>
    </div>
  );
};

export default FollowCard;
