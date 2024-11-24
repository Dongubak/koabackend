import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import WritePage from './pages/WritePage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';
import CourseRegPage from './pages/CourseRegPage';
import GoogleSearchForm from './test/GoogleSearchForm';
import Footer from './components/common/footer';
import styled from 'styled-components';
import MeetingPage from './pages/MeetingPage';
import ArrangeMeetingContainer from './containers/meeting/ArrangeMeetingContainer.js';
import ArrangeMeetingPage from './pages/ArrangeMeetingPage.js';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 페이지 전체 높이를 차지하도록 설정 */
`;

const ContentWrapper = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
`;

const App = () => {
  return(
    <PageWrapper>
      <Helmet>
        <title>KTC</title>
      </Helmet>
      <ContentWrapper>
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
          <Route path='/test' element={<GoogleSearchForm></GoogleSearchForm>}></Route>
          <Route path='/meeting'>
            <Route index element={<MeetingPage />} />
            <Route path='create' element={<ArrangeMeetingPage />} />
          </Route>
        </Routes>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  )
}

export default App;