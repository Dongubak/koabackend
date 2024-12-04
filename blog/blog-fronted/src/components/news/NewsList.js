import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import axios from 'axios';

const NewsListWrapper = styled(Responsive)`
  padding: 1rem;
`;

const NewsItemWrapper = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;

  h2 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

// 헬퍼 함수: 문자열 길이 제한
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const NewsItem = ({ title, description, link }) => {
  return (
    <NewsItemWrapper>
      <h2>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {truncateText(title, 50)} {/* 제목 글자 제한 */}
        </a>
      </h2>
      <p>{truncateText(description, 400)}</p> {/* 설명 글자 제한 */}
    </NewsItemWrapper>
  );
};

const NewsList = ({data, loading}) => {
  if (loading) {
    return <NewsListWrapper>Loading...</NewsListWrapper>;
  }

  return (
    <NewsListWrapper>
      <h2>오늘의 뉴스</h2>
      {data.map((item, index) => (
        <NewsItem
          key={index}
          title={item.title}
          description={item.description}
          link={item.link}
        />
      ))}
    </NewsListWrapper>
  );
};

export default NewsList;
