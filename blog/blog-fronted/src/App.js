import React from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import WritePage from './pages/WritePage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import CourseRegPage from './pages/CourseRegPage';

const App = () => {
  // const {user} = useSelector(({user}) => user.user);
  // console.log(user);
  return(
    <>
      <Helmet>
        <title>KTC</title>
      </Helmet>
      <Routes>
        <Route path='/' element={<PostListPage />} />
        <Route path='/login' element={<LoginPage /> } />
        <Route path='/register' element={<RegisterPage /> } />
        <Route path='/write' element={<WritePage /> } />
        <Route path='/:username'>
          <Route index element={<PostListPage /> } />
          <Route path=':postId' element={<PostPage /> } />
        </Route>
        <Route path='/course' element={<CourseRegPage />}></Route>
      </Routes>
    </>
  )
}

export default App;