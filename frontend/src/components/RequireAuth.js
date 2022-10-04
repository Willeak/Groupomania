import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthContext from '../contexts/AuthProvider';
import { Component } from 'react';

function RequireAuth() {
      let token = sessionStorage.getItem('token');
      const isLogin = token;
      console.log(isLogin);
      console.log('Is User Login?', isLogin);

      return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAuth;
