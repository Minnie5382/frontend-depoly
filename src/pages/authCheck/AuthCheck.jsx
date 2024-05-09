import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../utils/UserContext';
import axios from '../../utils/axiosInstance';

const AuthCheck = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    axios
      .get('/auth/userInfo')
      .then((response) => {
        login(response.data);
        navigate('/');
      })
      .catch((error) => {
        navigate('/');
      });
  }, [navigate]);

  return <div>유저 정보 확인 중..</div>;
};

export default AuthCheck;
