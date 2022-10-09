import React, { useContext } from 'react';
import CreatePost from '../components/CreatePost';

import Post from '../components/Post';
import Profile from '../components/Profile';
import Logo1 from './../assets/icon-left-font.png';

const Home = () => {
      return (
            <div className="flex  jc__centre center">
                  <div>
                        <img
                              src={Logo1}
                              alt="logo Groupomania"
                              className="logoHome"
                        />
                        <Profile />
                  </div>
                  <CreatePost />
            </div>
      );
};

export default Home;
