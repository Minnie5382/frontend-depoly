import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/Main';
import SignIn from '../../pages/signIn/SignIn';
import SignUp from '../../pages/signUp/SignUp';
import MovieDetail from '../../pages/movieDetail/MovieDetail';
import MovieReviews from '../../pages/movieReviews/MovieReviews';
import Search from '../../pages/search/Search';
import HotReviewsPage from '../../pages/hotReviews/HotReviewsPage';
import ChattingListPage from '../../pages/chatting/ChattingListPage';
import UserInfoPage from '../../pages/userInfoPage/UserInfoPage';
import ChattingRoomPage from '../../pages/chatting/chattingRoom/ChatRoom';
import Test from '../Test';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/movieDetail" element={<MovieDetail />} />
      <Route path="/movieReviews" element={<MovieReviews />} />
      <Route path="/search" element={<Search />} />
      {/* <Route path='/movies/:movieId' element={<MovieDetail />} />
      <Route path='/movies/:movieId/reviews' element={<MovieReview />} /> */}
      <Route path="/hotReviews" element={<HotReviewsPage />} />
      <Route path="/chattingList" element={<ChattingListPage />} />
      <Route path="/userInfo" element={<UserInfoPage />} />
      <Route path="/chattingRoom/*" element={<ChattingRoomPage />}>
        <Route path=":roomId" element={<ChattingRoomPage />} />
      </Route>
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default Router;
