import React from 'react';
import style from '../MyPage.module.css';
import Scrap from './scrap/Scrap';
import Following from './follow/Following';
import Followers from './follow/Followers';
import Collections from './collection/Collections';

const RightContainer = ({ tab }) => {
  return (
    <div className={style.rightContainer}>
      {tab === 'collection' && <Collections />}
      {tab === 'scrap' && <Scrap />}
      {tab === 'following' && <Following />}
      {tab === 'followers' && <Followers />}
    </div>
  );
};

export default RightContainer;
