import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import FormData from 'form-data';
import moment from 'moment';
import 'moment/locale/fr';

//adaptation du textaera selon lpassage a la ligne
const defaultStyle = {
      display: 'block',
      overflow: 'hidden',
      resize: 'none',
      width: '100%',
};

const regValidPost = /^[A-Za-z-0-9 &_@/;:.,'-éàê^`è&*+()!? \n \r]{10,280}$/;

const CreatePost = ({ style = defaultStyle, ...etc }) => {
      const authed = JSON.parse(localStorage.getItem('authed'));
      const userId = authed.userId;
      const name = authed.user;

      const [post, setPost] = useState('');
      const [validPost, setValidPost] = useState(false);
      const [userFocus, setUserFocus] = useState(false);

      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      const errRef = useRef();

      useEffect(() => {
            setValidPost(regValidPost.test(post));
      }, [post]);

      const textareaRef = useRef(null);
      const [currentValue, setCurrentValue] = useState(''); // you can manage data with it

      useEffect(() => {
            textareaRef.current.style.height = '0px';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + 'px';
      }, [currentValue]);

      // usestate stockage de l'image pour l'envoie du post
      const [selectedFile, setSelectedFile] = useState('');

      // console.log('image dans l input : ' + selectedFile);
      const [isSelected, setIsSelected] = useState(false);

      const PostImg = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);

            console.log('image detecté');
            // console.log('image detecté');
            console.log(event.target.files[0].name);
      };

      // envoie du post si clic effectué
      const handleSubmit = async (e) => {
            e.preventDefault();

            const sendPOST = `/api/posts/createPost/`;

            const v1 = regValidPost.test(post);
            if (!v1) {
                  setErrMsg('Texte invalide');
                  return;
            }

            // const maDate = new Date().toDateString('fr-FR');

            moment.locale('fr');
            let myDate;
            myDate = moment().format('dddd DD MMMM YYYY, à H[h]mm.');

            let data = {
                  userId: userId,
                  name: name,
                  description: post,
                  date: myDate,
            };

            const formPost = new FormData();

            formPost.append('userId', data.userId);
            formPost.append('name', data.name);
            formPost.append('image', selectedFile);
            formPost.append('description', data.description);
            formPost.append('date', data.date);

            const createdPost = {
                  post: Object.fromEntries(formPost),
            };
            console.log(createdPost);

            await axios
                  .post(sendPOST, createdPost, {
                        headers: {
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              // 'Content-Type': 'singlepart/form-data',
                        },
                        withCredentials: true,
                  })
                  .then((response) => {
                        console.log(JSON.stringify(response?.data?.message));
                        setSuccess(true);
                        setPost('');
                        setErrMsg('Post envoyé !');
                  })
                  .catch((error) => {
                        if (!error?.response) {
                              setErrMsg('Le serveur ne réponds pas');
                        } else if (error.response?.status === 400) {
                              setErrMsg('Envoie échoué');
                        } else {
                              setErrMsg('Connexion échouée');
                        }

                        if (error.response?.status !== undefined) {
                              console.error(error.response?.status);
                        }

                        errRef.current.focus();
                  });
      };

      // on pose un écouteur d'évènement keyup sur le textarea.
      // On déclenche la fonction count quand l'évènement se produit et au chargement de la page

      useEffect(() => {
            var textarea = document.querySelector('#CreatePost');

            // On selectionne l'element textarea et l'élement p#counterBlock

            var blockCount = document.getElementById('counterBlock');

            function count() {
                  // la fonction count calcule la longueur de la chaîne de caractère contenue dans le textarea
                  var count = 280 - textarea.value.length;
                  // et affche cette valeur dans la balise p#counterBlock grâce à innerHTML
                  blockCount.innerHTML = count;

                  // si le count descend sous 0 on ajoute la class red à la balise p#counterBlock
                  if (count < 0) {
                        blockCount.classList.add('red');
                  } else if (count >= 0) {
                        blockCount.classList.remove('red');
                  } else {
                  }
            }

            textarea.addEventListener('keyup', count);
            count();
      });

      return (
            <div className="BlocCreatePost">
                  <form className="formPost" onSubmit={handleSubmit}>
                        <label className="UploadImgPost">
                              <FontAwesomeIcon
                                    icon={faImage}
                                    className="UploadImg"
                              />
                              <input
                                    type="file"
                                    id="file"
                                    name="image"
                                    onChange={(event) => PostImg(event)}
                              />
                        </label>
                        <textarea
                              className="inputPost"
                              type="text"
                              id="CreatePost"
                              name="CreatePost"
                              placeholder="Exprimez vous..."
                              ref={textareaRef}
                              // maxLength="8"
                              autoComplete="off"
                              onChange={(e) => {
                                    setCurrentValue(e.target.value);
                                    setPost(e.target.value);
                                    //to do something with value, maybe callback?
                              }}
                              value={post}
                              required
                              aria-invalid={validPost ? 'false' : 'true'}
                              onFocus={() => setUserFocus(true)}
                              onBlur={() => setUserFocus(false)}
                        ></textarea>
                        <div className="controlPost">
                              <p
                                    ref={errRef}
                                    className={
                                          errMsg ? 'errmsgPost' : 'offscreen'
                                    }
                                    aria-live="assertive"
                              >
                                    {errMsg}
                              </p>
                              <p id="counterBlock"></p>
                              <button
                                    className="buttonCreatePost"
                                    id="buttonCreatePost"
                                    disabled={!validPost ? true : false}
                              >
                                    Envoyer
                              </button>
                        </div>
                  </form>
                  <div className="fadeGray" />
            </div>
      );
};

export default CreatePost;
