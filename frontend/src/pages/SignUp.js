import React from 'react';
// appel du component register
import Register from '../components/Register';
// appel du component background
import Background from '../components/Background';
// appel du component logo
import Logo from '../components/Logo';

const SignUp = () => {
      //generation  des components pour la  page signUp
      return (
            <div className="flex wrap jc__centre ai__centre fd__Column window top">
                  <Background />
                  <Logo />
                  <Register />
            </div>
      );
};

export default SignUp;
