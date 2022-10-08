import React, { useEffect, useReducer, useState } from 'react';
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

      const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

      // ======================================
      useEffect(() => {
            const postSubmit = async (e) => {
                  await axios
                        .get(POSTSList, {
                              headers: {
                                    'Content-Type': 'application/json',
                                    Authorization:
                                          'Bearer ' +
                                          sessionStorage.getItem('token'),
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

            postSubmit();
      }, [reducerValue]);

      //=======================================================

      const authed = JSON.parse(localStorage.getItem('authed'));
      const userId = authed.userId;

      const [like, setLike] = useState();

      if (like === undefined) {
            setLike(1);
      }

      const LikeSubmit = async (e) => {
            // setIdPost(e);
            const IdPost = e._id;
            console.log(e._id);
            const LikePosts = `/api/posts/${IdPost}/like`;

            async function myFunction() {
                  var chkPrint = document.getElementById(IdPost);
                  chkPrint.value = chkPrint.checked;
                  // console.log('value', chkPrint.value);

                  if (chkPrint.value === 'true') {
                        setLike(0);
                  } else if (chkPrint.value === 'false') {
                        setLike(1);
                  }
                  console.log(like);
            }
            myFunction();

            const formLike = {
                  like: like,
                  id: userId,
            };

            await axios
                  .post(LikePosts, formLike, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then((response) => {
                        console.log(response?.data?.message);
                  })
                  .catch((error) => {
                        if (!error?.response) {
                              console.log(error);
                        }
                  });
            forceUpdate();
      };

      console.log();

      return (
            <div>
                  {posts && posts.length > 0 ? (
                        posts
                              .map((post, i) => (
                                    <div className="Post" key={post._id}>
                                          <form className="">
                                                <div className="flex ai__centre">
                                                      <img
                                                            src=""
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
                                                                  id={post._id}
                                                                  type="checkbox"
                                                                  className="flex jc__SpaceA buttonLike"
                                                                  onClick={(
                                                                        e
                                                                  ) =>
                                                                        LikeSubmit(
                                                                              (e.target.value =
                                                                                    post)
                                                                        )
                                                                  }
                                                            />
                                                      </label>
                                                      <p>{post.likes}</p>
                                                </div>
                                          </form>
                                    </div>
                              ))
                              .reverse()
                  ) : (
                        <p className="errmsgUser">Aucun post disponible !</p>
                  )}
            </div>
      );
};

export default Post;
