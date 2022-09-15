import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Register from '../components/Register';
import Background from '../components/Background';
import Logo from '../components/Logo';

const SignUp = () => {
      return (
            <div className="flex wrap jc__centre ai__centre fd__Column window top">
                  <Background />
                  <Logo />
                  <Register />
            </div>
      );
};

export default SignUp;
