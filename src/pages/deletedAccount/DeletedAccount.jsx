import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeletedAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signin');
    alert('탈퇴한 회원입니다!');
  }, [navigate]);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default DeletedAccount;
