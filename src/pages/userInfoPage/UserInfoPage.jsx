import React, { useState } from 'react';
import Header from '../../components/header/Header';
import LeftContainer from './leftContainer/LeftContainer';
import RightContainer from './rightContainer/RightContainer';
import style from './UserInfoPage.module.css';

const UserInfoPage = () => {
  const [tab, setTab] = useState('collection');

  return (
    <div>
      <Header />
      <div className={style.container}>
        <LeftContainer tab={tab} setTab={setTab} />
        <RightContainer tab={tab} />
      </div>
    </div>
  );
};

export default UserInfoPage;
