import React from 'react';
import Connect from '../components/Connect';
import Background from '../components/Background';
import Logo from '../components/Logo';

const Login = () => {
      return (
            <div className="flex wrap jc__centre ai__centre fd__Column window top">
                  <Background />
                  <Logo />
                  <Connect />
            </div>
      );
};

export default Login;
