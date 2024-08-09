import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { useNavigate } from 'react-router';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const goLogin = () => {
    navigate('/login');
  }

  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout} goLogin={goLogin} />;
};

export default HeaderContainer;