import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import FormData from 'form-data';

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
      const POST = `/api/posts/createPost/`;

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
      const [selectedFile, setSelectedFile] = useState();
      // console.log('image dans l input : ' + selectedFile);
      const [isSelected, setIsSelected] = useState(false);

      const PostImg = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
      };
      // envoie du post si clic effectué
      const handleSubmit = async (e) => {
            e.preventDefault();
            const v1 = regValidPost.test(post);
            if (!v1) {
                  setErrMsg('Texte invalide');
                  return;
            }

            const formPost = new FormData();
            formPost.append('image', selectedFile);
            // formPost.append('id', userId);
            // formPost.append('text', post);
            // formPost.append('date', new Date());

            const date = new Date();

            let CreatePost = {
                  userId: userId,
                  name: name,
                  imageUrl: '',
                  description: post,
                  date: date,
            };

            console.log(CreatePost);
            console.log(JSON.stringify(CreatePost));
            await axios
                  .post(POST, JSON.stringify({ post: CreatePost }), {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              // withCredentials: true,
                        },
                  })
                  .then((response) => {
                        console.log(JSON.stringify(response));
                        setSuccess(true);
                        setPost('');
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
                              console.error(error.response?.status); // permet de vois la réponse coté serveur, si connecté message d'erreur en console pour affirmé 0 catch recu
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
                                    onChange={PostImg}
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
            </div>
      );
};

export default CreatePost;
