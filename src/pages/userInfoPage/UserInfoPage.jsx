import React, { useEffect, useState } from 'react';
import LeftContainer from './leftContainer/LeftContainer';
import RightContainer from './rightContainer/RightContainer';
import style from './UserInfoPage.module.css';
import { useQuery } from 'react-query';
import { getMyPage, getUserInfo } from '../../utils/user';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../utils/UserContext';

const UserInfoPage = () => {
  const [tab, setTab] = useState('collection');
  const { user, login } = useUser();
  const { userId } = useParams();
  const navigate = useNavigate();

  //유저인포가 달라지면 다시 호출해서 세션스토리지에 저장된 정보 갱신
  const { data, isLoading, isError, refetch } = useQuery(
    ['getMyPage', userId],
    () => getMyPage(userId),
    {
      onSuccess: (data) => {
        const serverUser = data?.data?.result;
        if (
          user &&
          serverUser &&
          (serverUser.userId !== user?.userId ||
            serverUser.nickname !== user?.nickname ||
            serverUser.level !== user?.level)
        ) {
          getUserInfo().then((response) => {
            login(response.data);
          });
        }
      },
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (data?.data?.result?.nickname === null) {
      alert('탈퇴한 회원입니다!');
      navigate('/');
    }
  }, [data, navigate]);

  const handleSetTab = (newTab) => {
    if (newTab !== tab) {
      setTab(newTab);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className={style.container}>
          <p>로딩중..</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <div className={style.container}>
          <p>존재하지 않는 사용자입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={style.container}>
        <LeftContainer tab={tab} setTab={handleSetTab} data={data} />
        <RightContainer tab={tab} />
      </div>
    </div>
  );
};

export default UserInfoPage;
