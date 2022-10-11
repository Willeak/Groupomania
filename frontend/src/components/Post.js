import React, { useEffect, useReducer, useState } from 'react';
//appel de font  awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
// appel du parametre axios
import axios from '../api/axios';
//appel de l'image de profil basic
import imgProfile from './../assets/avatar_neutre.png';
import { Link } from 'react-router-dom';

const Post = () => {
      //appel de  l'api des pots pour l'utilisation du .map
      const POSTSList = `/api/posts/`;
      // user list permetant la filtration via la search bar
      const [posts, setPosts] = useState([]);
      //response original

      // permet  de forcer l'update d'un component
      const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0); // ligne 47 et 99
      // requete des posts
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

      // get value du localStorage
      const authed = JSON.parse(localStorage.getItem('authed'));
      const userId = authed.userId;
      // definir la valeur du like par 0 ou 1 selon si le post est like ou non
      const [like, setLike] = useState();
      //si undefined lui donner 0
      if (like === undefined) {
            setLike(0);
      }
      // fonction au click du bouton Like
      const LikeSubmit = async (e) => {
            //recuperer les valeur dynamique de la .map
            const IdPost = e._id;
            //appel de l'api
            const LikePosts = `/api/posts/${IdPost}/like`;
            //recuperation de l'id dynamique de l'input Heart
            var chkPrint = document.getElementById(IdPost);
            chkPrint.value = chkPrint.checked;
            // si l'input est false ou true convertir en nombre
            if (chkPrint.value === 'true') {
                  setLike(0);
            } else if (chkPrint.value === 'false') {
                  setLike(1);
            }
            // format a l'envoi du la requete
            const formLike = {
                  like: like,
                  id: userId,
            };
            //axios post du like avec l'userId
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
            forceUpdate(); // <--- apres le click de l'input  HEART, forceUpdate le compteur de like
      };
      //récuperation des valeurs au chargement
      async function setInputValue(e) {
            const IdPost = e._id;
            var chkPrint = document.getElementById(IdPost);
            chkPrint.value = chkPrint.checked;
            // si l'input est false ou true convertir en nombre
            if (chkPrint.value === 'true') {
                  setLike(0);
            } else if (chkPrint.value === 'false') {
                  setLike(1);
            }

            //si un post contient l'userId dans les usersLiked définir l'input HEART sur true
            if (e.usersLiked.includes(userId)) {
                  console.log(e._id + '= tu a voté');
                  let el = document.getElementById(e._id);
                  el.checked = 'true';
                  el.value = 'true';
                  // el.initialValues = 'false';
                  let heart = document.getElementById(e._id + 1);
                  heart.style.color = 'red';
            }
            //si l'userId enregistré sur un post correspond a l'userId de l'utilisateur afficher en display flex le bouton settingpost
            if (
                  e.userId === userId ||
                  authed.userId === '63347f831f9cf84f32dd4f07' // id Administrateur
            ) {
                  let element = document.getElementById(e._id + 2);
                  element.style.display = 'flex';
                  //si l'userId enregistré sur un post ne correspond pas afficher en display none
            } else if (e.userId !== userId) {
                  let element = document.getElementById(e._id + 2);
                  element.style.display = 'none';
            }
            // au click du bouton setting post afficher uen fenetre flottante
            document.getElementById(e._id + 2).onclick = function () {
                  //si elle est deja en display flex alors retourner la valeur display none
                  if (
                        document.getElementById(e._id + 3).style.display ===
                        'flex'
                  ) {
                        let window = document.getElementById(e._id + 3);
                        return (window.style.display = 'none');
                  }
                  //fenetre flottante
                  let window = document.getElementById(e._id + 3);
                  window.style.display = 'flex';
            };
            //si l'img src est égale a "" mettre display  none sur l'img
            if (
                  !document
                        .getElementById(e._id + 'Image')
                        .getAttribute('src', '')
            ) {
                  let image = document.getElementById(e._id + 'Image');
                  image.style.display = 'none';
            }

            // au clic du bouton MODIFY envoyer la requete avec l'id du post pour la modification
            document.getElementById(e._id + 'Modify').onclick = function () {
                  //si elle est deja en display flex alors retourner la valeur display none
                  if (
                        document.getElementById('ModifyPost').style.display ===
                        'flex'
                  ) {
                        let modify = document.getElementById(e._id + 3);
                        return (modify.style.display = 'none');
                  }
                  //fenetre flottante
                  let modify = document.getElementById('ModifyPost');
                  modify.style.display = 'flex';
                  console.log('modify');
                  let window = document.getElementById(e._id + 3);
                  window.style.display = 'none';
            };

            // au clic du bouton DELETE envoyer la requete avec l'id du post pour la suppression
            document.getElementById(e._id + 'Delete').onclick = function () {
                  //appel de l'api
                  const DELETEPost = `/api/posts/${e._id}`;
                  //requete delete du post
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
                                                      <div
                                                            id={post._id + 2}
                                                            className="flex jc__centre ai__centre DivPostSettings"
                                                      >
                                                            <FontAwesomeIcon
                                                                  icon={
                                                                        faSliders
                                                                  }
                                                                  className="PostSettings"
                                                            />
                                                      </div>
                                                      <div
                                                            id={post._id + 3}
                                                            className="flex jc__centre ai__centre fd__Column windowPostSettings"
                                                      >
                                                            <Link
                                                                  className="buttonSettingPost"
                                                                  to={`/ModifyIdPost?=${post._id}`}
                                                            >
                                                                  <p
                                                                        id={
                                                                              post._id +
                                                                              'Modify'
                                                                        }
                                                                  >
                                                                        modifier
                                                                  </p>
                                                            </Link>

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
                                                      src={post.imageUrl}
                                                      alt={
                                                            'photo du commentaire de' +
                                                            post.name
                                                      }
                                                      id={post._id + 'Image'}
                                                      className="imgPost"
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
