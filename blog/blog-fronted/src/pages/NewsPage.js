import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NewsListContainer from '../containers/news/NewsListContainer';

const NewsPage = () => {
   return (
      <>
         <HeaderContainer />
         <NewsListContainer></NewsListContainer>
      </>
   )
}

export default NewsPage;