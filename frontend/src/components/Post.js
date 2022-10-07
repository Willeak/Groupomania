import React, { useEffect, useState } from 'react';
// import imgProfile from 'http://localhost:3000/images/profile/avatar_neutre.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import axios from '../api/axios';
import imgProfile from './../assets/avatar_neutre.png';
import moment from 'moment';
import 'moment/locale/fr';

const Post = () => {
      //utilisation .map
      const POSTSList = `/api/posts/`;
      // user list permetant la filtration via la search bar
      const [posts, setPosts] = useState([]);
      //response original
      console.log(posts);

      // ======================================

      const postSubmit = async (e) => {
            await axios
                  .get(POSTSList, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then((response) => {
                        // console.log(JSON.stringify(response));
                        console.log(response?.data);
                        setPosts(response?.data);
                  })
                  .catch((error) => {
                        if (!error?.response) {
                              console.log(error);
                        }
                  });
      };

      useEffect(() => {
            postSubmit();
      }, []);

      return (
            <div>
                  {/* <div className="flex ai__centre">
                        <img
                              // src={imgProfile}
                              alt=""
                              className="imgProfilePost"
                        />
                        <div className="Name">Jean Dupont</div>
                        <div className="hourly"> · le 24 Septembre à 9h12</div>
                  </div>
                  <div className="textPost">
                        Bonjour à tous, <br />
                        <br />
                        je m'appel Jean Dupont et je suis développeur Web.
                        <br />
                        <br /> Bonne journé a tous !
                  </div>
                  <div className="flex jc__SpaceA">
                        <div>Commenter</div>
                        <div>like dislike</div>
                  </div> */}
                  {posts && posts.length > 0 ? (
                        posts
                              .map((post, index) => (
                                    <div className="Post">
                                          <form className="" key={index}>
                                                <div className="flex ai__centre">
                                                      <img
                                                            src={
                                                                  post.description
                                                            }
                                                            alt=""
                                                            className="imgProfilePost"
                                                            onError={(e) => {
                                                                  e.target.src =
                                                                        imgProfile;
                                                            }}
                                                      />
                                                      <div className="Name">
                                                            {post.name}
                                                      </div>
                                                      <div className="hourly">
                                                            {' '}
                                                            ● le {post.date}
                                                      </div>
                                                </div>
                                                <img
                                                      // src=
                                                      alt=""
                                                      className="imgProfilePost"
                                                      onError={(e) => {
                                                            e.target.src =
                                                                  imgProfile;
                                                      }}
                                                />
                                                <div className="textPost">
                                                      {post.description}
                                                </div>
                                                <div className="flex jc__centre likeCont">
                                                      <label className="iconLikeBg">
                                                            <div className="LikeAnim" />
                                                            <FontAwesomeIcon
                                                                  className="iconLike"
                                                                  icon={faHeart}
                                                            />
                                                            <input
                                                                  id=""
                                                                  type="checkbox"
                                                                  className="flex jc__SpaceA buttonLike"
                                                            />
                                                      </label>
                                                      <p>{post.likes}</p>
                                                </div>
                                          </form>
                                    </div>
                              ))
                              .reverse()
                  ) : (
                        <p className="errmsgUser">Aucun post !</p>
                  )}
            </div>
      );
};

export default Post;
