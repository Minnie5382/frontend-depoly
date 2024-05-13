import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../utils/UserContext';
import { getUserInfo } from '../../utils/user';

const AuthCheck = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    getUserInfo()
      .then((response) => {
        login(response.data);
        navigate('/');
      })
      .catch(() => {
        navigate('/');
      });
  }, [navigate, login]);

  return <div>유저 정보 확인 중..</div>;
};

export default AuthCheck;
