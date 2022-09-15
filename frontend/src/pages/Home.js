import React from 'react';
import CreatePost from '../components/CreatePost';
import Logo from '../components/Logo';
import Profile from '../components/Profile';

const Home = () => {
      return (
            <div className="">
                  <div className="flex fd__Column ai__centre jc__centre jc__SpaceA">
                        <Logo />
                        <Profile />
                  </div>
                  <CreatePost />
            </div>
      );
};

export default Home;
