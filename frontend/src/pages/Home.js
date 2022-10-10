import React from 'react';
//appel du compoenent createpost
import CreatePost from '../components/CreatePost';
//appel du compoenent profile
import Profile from '../components/Profile';
// appel de l'image de profil basic
import Logo1 from './../assets/icon-left-font.png';

const Home = () => {
      //appel des componenets pour la page home
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
