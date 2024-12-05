import React, { useEffect } from 'react';
import NewsList from '../../components/news/NewsList';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../modules/news';
import { useSearchParams } from 'react-router-dom';

const NewsListContainer = () => {
   const dispatch = useDispatch();
   
   const { data } = useSelector((state) => state.news);
   const loading = useSelector((state) => state.loading['news/'])

   useEffect(() => {
      dispatch(getNews());   
   }, [])

   return (
      <NewsList data={data} loading={loading}></NewsList>
   )
}

export default NewsListContainer;