import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import { Helmet } from 'react-helmet-async';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
  pre {
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    background-color: #f5f5f5; /* 기본 배경색 */
    code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 1rem;
      color: inherit; /* 기본 색상 유지 */
    }
  }
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  useEffect(() => {
    document.querySelectorAll('code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [post]);

  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, username, created_date, subject } = post;

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - KTC</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={username}
          publishedDate={created_date}
          subject={subject}
          hasMarginTop
        />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;