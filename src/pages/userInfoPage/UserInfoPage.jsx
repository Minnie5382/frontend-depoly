import React, { useState } from 'react';
import Header from '../../components/header/Header';
import LeftContainer from './leftContainer/LeftContainer';
import RightContainer from './rightContainer/RightContainer';
import style from './UserInfoPage.module.css';
import { useQuery } from 'react-query';
import { getMyPage } from '../../utils/user';
import { useParams } from 'react-router-dom';

const UserInfoPage = () => {
  const [tab, setTab] = useState('collection');
  const { userId } = useParams();

  const { data, isLoading, isError } = useQuery(['getMyPage', userId], () =>
    getMyPage(userId)
  );

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className={style.container}>
          <p>로딩중..</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Header />
        <div className={style.container}>
          <p>존재하지 않는 사용자입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={style.container}>
        <LeftContainer tab={tab} setTab={setTab} data={data} />
        <RightContainer tab={tab} />
      </div>
    </div>
  );
};

export default UserInfoPage;
