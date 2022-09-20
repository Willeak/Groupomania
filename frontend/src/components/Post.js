import React from 'react';
import imgProfile from './../assets/avatar_neutre.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = () => {
      //utilisation .map
      return (
            <div className="Post">
                  <div className="flex ai__centre">
                        <img
                              src={imgProfile}
                              alt=""
                              className="imgProfilePost"
                        />
                        <div className="Name">Jean Dupont</div>
                        <div className="hourly"> · le 24 Septembre à 9h12</div>
                  </div>
                  <div className="textPost">
                        Bonjour à tous, <br />
                        <br />
                        je m'appel Jean Dupont et je susi développeur Web.
                        <br />
                        <br /> Bonne journé a tous !
                  </div>
                  <div className="flex jc__SpaceA">
                        <div>Commenter</div>
                        <div>like dislike</div>
                  </div>
            </div>
      );
};

export default Post;
