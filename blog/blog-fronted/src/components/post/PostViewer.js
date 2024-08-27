import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import { Helmet } from 'react-helmet-async';
import hljs from 'highlight.js';
// import 'highlight.js/styles/default.css';


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
  font-family: "Gowun Dodum", sans-serif;
  font-weight: 400;
  font-style: normal;
  pre {
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    background-color: #23241f; /* 기본 배경색 */
    code {
      font-family: 'Courier New', Courier, monospace;
      color: inherit; /* 기본 색상 유지 */
      white-space: pre; /* white-space 속성 추가 */
    }
  }
  .ql-syntax {
    @media (max-width: 1024px) {
      font-size: 1rem; 
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
    font-weight: 500;
    .hljs-comment {
      color: #5C6339;
    }
  }
`;

const decodeHtml = (html) => {
  const text = document.createElement('textarea');
  text.innerHTML = html;
  return text.value;
};

const transformBody = (body) => {
  return decodeHtml(body)
    .replace(/<div class="ql-code-block-container"[^>]*>/g, '<pre><code>')
    .replace(/<\/div><div class="ql-code-block">/g, '\n')
    .replace(/<div class="ql-code-block">/g, '')
    .replace(/<\/div><\/div>/g, '</code></pre>')
    .replace(/<pre class="ql-syntax"[^>]*>/g, '<pre><code>')
    .replace(/<\/pre>/g, '</code></pre>');
};

const PostViewer = ({ post, error, loading, actionButtons }) => {
  useEffect(() => {
    // < 와 > 를 일시적으로 다른 문자로 변환
    document.querySelectorAll('pre').forEach((block) => {
      block.innerHTML = block.innerHTML
        .replace(/</g, '###lt###')
        .replace(/>/g, '###gt###');
      
      // 하이라이팅 적용
      hljs.highlightElement(block);

      // 하이라이팅 후 다시 < 와 > 로 복원
      // block.innerHTML = block.innerHTML
      //   .replace(/###lt###/g, '<')
      //   .replace(/###gt###/g, '>');
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

  const { title, body, username, created_date, subject, comment_count } = post;

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
          comment_count={comment_count}
          hasMarginTop
        />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;