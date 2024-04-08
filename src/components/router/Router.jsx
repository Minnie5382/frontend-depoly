import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/Main';
import SignIn from '../../pages/signIn/SignIn';
import SignUp from '../../pages/signUp/SignUp';
import MovieDetail from '../../pages/movieDetail/MovieDetail';
import MovieReviews from '../../pages/movieReviews/MovieReviews';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/movieDetail' element={<MovieDetail />} />
      <Route path='/movieReviews' element={<MovieReviews />} />
      {/* <Route path='/movies/:movieId' element={<MovieDetail />} />
      <Route path='/movies/:movieId/reviews' element={<MovieReview />} /> */}
    </Routes>
  );
};

export default Router;
