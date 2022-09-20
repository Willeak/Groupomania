import React from 'react';
import CreatePost from '../components/CreatePost';
import Logo from '../components/Logo';
import Post from '../components/Post';
import Profile from '../components/Profile';

const Home = () => {
      return (
            <div className="flex  jc__centre center">
                  <div className="columnLeft">
                        <Logo />
                        <Profile />
                  </div>
                  <div className="BlocPost">
                        <CreatePost />
                        <Post />
                  </div>
            </div>
      );
};

export default Home;
