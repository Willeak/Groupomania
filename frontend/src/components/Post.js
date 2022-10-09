import React, { useEffect, useReducer, useState } from 'react';
// import imgProfile from 'http://localhost:3000/images/profile/avatar_neutre.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

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

      const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0); // ligne 47 et 99

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
      }, [reducerValue]); // <--- reducerValue | a ajouter pour refresh auto le component

      //=======================================================

      const authed = JSON.parse(localStorage.getItem('authed'));
      const userId = authed.userId;

      const [like, setLike] = useState();

      if (like === undefined) {
            setLike(0);
      }

      const LikeSubmit = async (e) => {
            // setIdPost(e);
            const IdPost = e._id;
            console.log(e._id);
            const LikePosts = `/api/posts/${IdPost}/like`;

            var chkPrint = document.getElementById(IdPost);
            chkPrint.value = chkPrint.checked;
            // console.log('value', chkPrint.value);

            if (chkPrint.value === 'true') {
                  setLike(1);
            } else if (chkPrint.value === 'false') {
                  setLike(0);
            }
            console.log(like);

            const formLike = {
                  like: like,
                  id: userId,
            };

            await axios
                  .post(LikePosts, formLike, {
                        headers: {
                              // 'Content-Type': 'multipart/form-data',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
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

      async function setInputValue(e) {
            if (e.usersLiked.includes(userId)) {
                  console.log(e._id + '= tu a voté');
                  let el = document.getElementById(e._id);
                  el.checked = 'true';
                  el.value = 'true';
                  el.initialValues = 'false';
                  let heart = document.getElementById(e._id + 1);
                  heart.style.color = 'red';
            }

            console.log(e.usersLiked);

            if (e.userId === userId) {
                  let element = document.getElementById(e._id + 2);
                  element.style.display = 'flex';
            } else if (e.userId !== userId) {
                  let element = document.getElementById(e._id + 2);
                  element.style.display = 'none';
            }

            document.getElementById(e._id + 2).onclick = function () {
                  if (
                        document.getElementById(e._id + 3).style.display ===
                        'flex'
                  ) {
                        let window = document.getElementById(e._id + 3);
                        return (window.style.display = 'none');
                  }
                  let window = document.getElementById(e._id + 3);
                  window.style.display = 'flex';
            };

            document.getElementById(e._id + 'Delete').onclick = function () {
                  const DELETEPost = `/api/posts/${e._id}`;

                  async function DeleteMyPost() {
                        await axios
                              .delete(DELETEPost, {
                                    headers: {
                                          'Content-Type': 'application/json',
                                          Authorization:
                                                'Bearer ' +
                                                sessionStorage.getItem('token'),
                                          withCredentials: true,
                                    },
                              })
                              .then((response) => {
                                    console.log(
                                          JSON.stringify(
                                                response?.data?.message
                                          )
                                    );
                              })
                              .catch((error) => {
                                    if (!error?.response) {
                                          console.log(error);
                                    }
                              });
                        forceUpdate();
                  }
                  DeleteMyPost();
            };
      }

      return (
            <div>
                  {posts && posts.length > 0 ? (
                        posts
                              .map((post, i) => (
                                    <div className="Post" key={post._id}>
                                          <form
                                                className=""
                                                onLoad={(e) =>
                                                      setInputValue((e = post))
                                                }
                                          >
                                                <div className="flex ai__centre">
                                                      <img
                                                            src={post.userImg}
                                                            alt={
                                                                  'photo de profil de' +
                                                                  post.name
                                                            }
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
                                                      <div className="flex jc__centre ai__centre DivPostSettings">
                                                            <FontAwesomeIcon
                                                                  icon={
                                                                        faSliders
                                                                  }
                                                                  id={
                                                                        post._id +
                                                                        2
                                                                  }
                                                                  className="PostSettings"
                                                            />
                                                      </div>
                                                      <div
                                                            id={post._id + 3}
                                                            className="flex jc__centre ai__centre fd__Column windowPostSettings"
                                                      >
                                                            <button
                                                                  id={
                                                                        post._id +
                                                                        'Modify'
                                                                  }
                                                                  className="buttonSettingPost"
                                                            >
                                                                  modifier
                                                            </button>
                                                            <p
                                                                  id={
                                                                        post._id +
                                                                        'Delete'
                                                                  }
                                                                  className="buttonSettingPost"
                                                            >
                                                                  supprimer
                                                            </p>
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
                                                                  id={
                                                                        post._id +
                                                                        1
                                                                  }
                                                                  className={
                                                                        ' iconLike '
                                                                  }
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
                                                      <p className="counterLike">
                                                            {post.likes}
                                                      </p>
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
