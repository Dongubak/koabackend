import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from './Sidebar';
import { MdOutlineTipsAndUpdates } from "react-icons/md";


const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 1001;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  .search_icon {
    margin-right: 0.5rem;
    font-size: 1.5rem; /* 햄버거 메뉴 크기를 약간 키움 */
    cursor: pointer;
  }
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 4rem;
  left: ${({ isOpen }) => (isOpen ? '0' : '-220px')}; /* 사이드바의 가시성을 조절 */
  transition: left 0.3s ease;
  z-index: 1000; /* 헤더 아래에 위치하도록 설정 */
`;

const Header = ({ user, onLogout, goLogin, onGoHome, onGoCourse, tip }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <LogoWrapper>
            <GiHamburgerMenu className="search_icon" onClick={toggleSidebar} />
            <Link to="/" className="logo">
              KTC
            </Link>

          </LogoWrapper>
          
          {user ? (
            <div className="right">
              <Wrap>
                <div>
                  <TooltipSpan data-tooltip={tip}><MdOutlineTipsAndUpdates className='tip_icon'/></TooltipSpan>
                </div>
              </Wrap>
              <UserInfo>{user.user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login" onClick={goLogin}>로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
      <SidebarWrapper isOpen={isSidebarOpen}>
        <Sidebar onGoHome={onGoHome} onGoCourse={onGoCourse} />
      </SidebarWrapper>
    </>
  );
};

export default Header;

const Wrap = styled.div`
  padding: 0.5rem;
  text-align: center;
  /* background: #e0e0e0; */
`;

const TooltipSpan = styled.span`
  position: relative;

  &:before,
  &:after {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    transition: all 0.2s ease;
    font-size: 11px;
    font-family: dotum;
    letter-spacing: -1px;
  }

  &:before {
    content: attr(data-tooltip);
    height: 13px;
    position: absolute;
    bottom: -20px; /* Tooltip text appears below the element */
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    background: #025272;
    box-shadow: 0 3px 8px rgba(165, 165, 165, 0.5);
  }

  &:after {
    content: '';
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #025272; /* Triangle pointing upwards */
    bottom: -8px; /* Position triangle below the tooltip text */
  }

  &:hover:before {
    visibility: visible;
    opacity: 1;
    bottom: -30px; /* Adjust to move tooltip text further down */
  }

  &:hover:after {
    visibility: visible;
    opacity: 1;
    bottom: -2px; /* Adjust to align the triangle correctly */
  }
  .tip_icon {
    font-size: 1.5rem;
  }
`;