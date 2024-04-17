import React from 'react';
import style from '../../MyPage.module.css';

const FollowCard = ({ profileImage, level, name, isCertified, isFollowed }) => {
  const buttonStyle = isFollowed
    ? style.followBtnUnfollow
    : style.followBtnFollow;

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
        <button className={`${style.followBtn} ${buttonStyle}`}>
          {isFollowed ? '팔로우 취소' : '팔로우'}
        </button>
      </div>
    </div>
  );
};

export default FollowCard;
