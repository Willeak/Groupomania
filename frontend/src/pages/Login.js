import React from 'react';
//appel du component conenct
import Connect from '../components/Connect';
//appel du component background
import Background from '../components/Background';
//appel du logo
import Logo from '../components/Logo';

const Login = () => {
      //appel des compoenents pour lapage Login
      return (
            <div className="flex wrap jc__centre ai__centre fd__Column window top">
                  <Background />
                  <Logo />
                  <Connect />
            </div>
      );
};

export default Login;
