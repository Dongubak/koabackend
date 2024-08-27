import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from './Sidebar';
// import { MdOutlineTipsAndUpdates } from "react-icons/md";

const HeaderBlock = styled.div`
  @media (max-width: 768px) {
      font-size: 0.8rem;
  }
  position: fixed;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 1001;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ._link {
    @media (max-width: 1024px) {
      font-size: 1rem; 
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 0 0.2rem;
    }
    margin: 0rem;
    background: transparent;
  }

  .search_icon {
    margin-right: 0.5rem;
    @media (max-width: 1024px) {
      font-size: 1rem; 
    }
    @media (max-width: 768px) {
      font-size: 1rem;
    }
    
    cursor: pointer;
    margin: 10px; 
  }
`;

const Wrapper = styled(Responsive)`
  
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    @media (max-width: 1024px) {
      font-size: 1.125rem;
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
    font-family: "Orbitron", sans-serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    padding-right: 0.2rem;
  }
  .right {
    display: flex;
    align-items: center;
  }

  .button_logout {
    @media (max-width: 1024px) {
      font-size: 1rem; 
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
    @media (max-width: 578px) {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 578px) {
      padding: 0.3rem;
      font-size: 0.8rem;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
  font-size: 1.07rem;
  font-family: "Podkova", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0rem;
  left: 0;
  transform: ${props => props.$isOpen ? 'translateX(-10%)' : 'translateX(-120%)'};
  transition: transform 0.3s ease-in-out;
  width: 200px;
  height: 100%;
  background-color: transparent;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: ${props => (props.$isOpen ? 'block' : 'none')};
`;

const Header = ({ user, onLogout, goLogin, onGoHome, onGoCourse, tip, location, navigators }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setTimeout(() => setSidebarOpen(state => state), 0);
  }

  // if(location.pathname === '/') {
  //   console.log(location.pathname);
  // }
  
  const closeSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => setSidebarOpen(state => state), 0);
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
            {
              location.pathname === '/' ? <>
                <Button className="_link" grey={true} onClick={navigators.viewAll}>전체</Button>
                <Button className='_link' grey={true} onClick={navigators.viewCommunity}>커뮤</Button>
                <Button className='_link' grey={true} onClick={navigators.viewKnowledge}>지식</Button>
                <Button className='_link' grey={true} onClick={navigators.viewQna}>질문</Button>
                <Button className='_link' grey={true} onClick={navigators.viewAnnouncement}>공지</Button>

                {/* <Link className="_link">전체</Link>
                <Link className="_link">커뮤니티</Link>
                <Link className="_link">지식</Link>
                <Link className="_link">질문</Link>
                <Link className="_link">공지</Link> */}
              </> : null
            }
          </LogoWrapper>
          
          {user ? (
            <div className="right">
              <UserInfo>{user.user.username}</UserInfo>
              <Button className="button_logout" onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login" onClick={goLogin}>로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
      <Overlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
      <SidebarWrapper $isOpen={isSidebarOpen}>
        <Sidebar onGoHome={onGoHome} onGoCourse={onGoCourse} />
      </SidebarWrapper>
    </>
  );
};

export default Header;

const Wrap = styled.div`
  padding: 0.5rem;
  text-align: center;
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
    bottom: -20px;
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
    border-bottom: 5px solid #025272;
    bottom: -8px;
  }

  &:hover:before {
    visibility: visible;
    opacity: 1;
    bottom: -30px;
  }

  &:hover:after {
    visibility: visible;
    opacity: 1;
    bottom: -2px;
  }

  .tip_icon {
    font-size: 1.5rem;
  }
`;