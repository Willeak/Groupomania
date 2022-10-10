import React from 'react';
import { Link, Navigate } from 'react-router-dom';
//appel du compoenent createpost
import CreatePost from '../components/CreatePost';
import ModifyPost from '../components/ModifyPost';
//appel du compoenent profile
import Profile from '../components/Profile';
// appel de l'image de profil basic
import Logo1 from './../assets/icon-left-font.png';

const Home = () => {
      async function close() {
            let modify = document.getElementById('ModifyPost');
            modify.style.display = 'none';
      }

      //appel des componenets pour la page home
      return (
            <div className="flex  jc__centre center">
                  <div id="ModifyPost">
                        <ModifyPost />
                        <div>
                              <Link to={'/'} onClick={close}>
                                    <button
                                          className="buttonCreatePost"
                                          id="CancelModify"
                                    >
                                          Annuler
                                    </button>
                              </Link>
                        </div>
                  </div>

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
