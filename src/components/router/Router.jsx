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
import { UserProvider } from '../../utils/UserContext';
import PublicRoute from '../../utils/PublicRoute';
import AuthCheck from '../../pages/authCheck/AuthCheck';
import Layout from '../layout/Layout';

const Router = () => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path='/signin'
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path='/search'
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path='/movies/:movieId'
          element={
            <Layout>
              <MovieDetail />
            </Layout>
          }
        />
        <Route
          path='/movies/:movieId/reviews'
          element={
            <Layout>
              <MovieReviews />
            </Layout>
          }
        />
        <Route
          path='/hotReviews'
          element={
            <Layout>
              <HotReviewsPage />
            </Layout>
          }
        />
        <Route
          path='/chattingList'
          element={
            <Layout>
              <ChattingListPage />
            </Layout>
          }
        />
        <Route
          path='/userInfo/:userId'
          element={
            <Layout>
              <UserInfoPage />
            </Layout>
          }
        />
        <Route
          path='/chattingRoom/*'
          element={
            <Layout>
              <ChattingRoomPage />
            </Layout>
          }
        >
          <Route path=':roomId' element={<ChattingRoomPage />} />
        </Route>
        <Route path='/auth/check' element={<AuthCheck />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </UserProvider>
  );
};

export default Router;
