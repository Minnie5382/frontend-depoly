import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/Main';
import SignIn from '../../pages/signIn/SignIn';
import SignUp from '../../pages/signUp/SignUp';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
};

export default Router;
