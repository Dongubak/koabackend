import React from 'react';
import styled from 'styled-components';
import { FaGithub } from "react-icons/fa";

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
  

  background-color: #f8f9fa; /* 밝은 회색 배경 */
  margin-top: 1rem;
  /* padding: 0.5rem 0; */
  text-align: center;
  font-size: 0.9rem;
  color: #495057; /* 다크 그레이 텍스트 */
  border-top: 1px solid #dee2e6; /* 상단에 얇은 선 추가 */
  bottom: 0;
  width: 100%;

  .github_logo {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  @media (min-width: 768px) {
    flex-direction: row;
    p {
      margin-right: 1rem;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    p {
      margin: 0;
    }
  }
  align-items: center;
  
`;

const GithubLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  color: inherit;
  text-decoration: none;
  

  span {
    font-size: 0.9rem;
  }

  &:hover {
    color: #007bff; /* 호버 시 파란색으로 변경 */
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <p>© 2024 KTC Community. All rights reserved.</p>
        <p>© Created for non-commercial purposes only.</p>
        <GithubLink href="https://github.com/Dongubak/koabackend" target="_blank">
          {/* <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" /> */}
          <FaGithub className="github_logo"></FaGithub>
          <span>View on GitHub</span>
        </GithubLink>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;