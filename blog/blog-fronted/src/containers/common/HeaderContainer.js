import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { useNavigate } from 'react-router';

const HeaderContainer = () => {
  const user = useSelector((state) => state.user.user);

  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const goLogin = () => {
    navigate('/login');
  }

  const onLogout = () => {
    dispatch(logout());
  }

  const onGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onGoCourse = useCallback(() => {
    navigate('/course');
  }, [navigate]);

  return <Header user={user} 
  onLogout={onLogout} 
  goLogin={goLogin}
  onGoHome={onGoHome}
  onGoCourse={onGoCourse}
  />;
};

export default HeaderContainer;