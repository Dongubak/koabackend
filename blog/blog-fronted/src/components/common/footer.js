import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  color: #495057; /* 다크 그레이 텍스트 */
  border-top: 1px solid #dee2e6; /* 상단에 얇은 선 추가 */
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© 2024 KTC Community. All rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;