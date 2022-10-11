import React, { useRef, useState, useEffect, useReducer } from 'react';
//appel du parametre axios
import axios from '../api/axios';
//appel de font awesomes pour  les icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
// appel de formdata
import FormData from 'form-data';
//appel de moment et definit  sur  FR
import moment from 'moment';
import 'moment/locale/fr';
// appel du component post
import Post from './Post';

//adaptation du textaera selon le passage a la ligne
const defaultStyle = {
      display: 'block',
      overflow: 'hidden',
      resize: 'none',
      width: '100%',
};
// regex pour la créatino d'un post
const regValidPost = /^[A-Za-z-0-9 &_@/;:.,'-éàê^`è&*+()!? \n \r]{10,280}$/;

const CreatePost = ({ style = defaultStyle, ...etc }) => {
      //appel du localstorage
      const authed = JSON.parse(localStorage.getItem('authed'));
      const userId = authed.userId;
      const userImg = 'http://localhost:3000' + authed.img;
      const name = authed.user;

      const [post, setPost] = useState('');

      const [validPost, setValidPost] = useState(false);
      const [userFocus, setUserFocus] = useState(false);

      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      const errRef = useRef();
      // set  regex sur le textarea
      useEffect(() => {
            setValidPost(regValidPost.test(post));
      }, [post]);

      const textareaRef = useRef(null);
      const [currentValue, setCurrentValue] = useState('');

      useEffect(() => {
            textareaRef.current.style.height = '0px';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + 'px';
      }, [currentValue]);

      // usestate stockage de l'image pour l'envoie du post
      const [selectedFile, setSelectedFile] = useState('');
      const [isSelected, setIsSelected] = useState(false);
      // au click de l'imput set le fichier et  set la value sur  true pour definir une autre requete
      const PostImg = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
      };
      // envoie du post si clic effectué
      const handleSubmit = async (e) => {
            e.preventDefault();
            //generation de la notification
            document.getElementById('Message').style.display = 'flex';
            //appel de l'api
            const sendPOST = `/api/posts/createPost/`;
            // si le regex ne  corresponds pas refus de l'envoie + en CSS desactivation du bouton pour plus de sécurité
            const v1 = regValidPost.test(post);
            if (!v1) {
                  setErrMsg('Texte invalide');
                  return;
            }
            // definir la langue de Moement
            moment.locale('fr');
            let myDate;
            //definir le format a l'envoi
            myDate = moment().format('dddd DD MMMM YYYY, à H[h]mm.');
            // creation d'un tableau de valeur
            let data = {
                  userImg: userImg,
                  userId: userId,
                  name: name,
                  description: post,
                  date: myDate,
            };
            // set valeur du form data pour l'envoi DU POST SANS IMAGE !
            const formPost = new FormData();
            formPost.append('userImg', data.userImg);
            formPost.append('userId', data.userId);
            formPost.append('name', data.name);
            formPost.append('description', data.description);
            formPost.append('date', data.date);
            // si la selection de l'input image est sur false alors envoie de la requete specific
            if (isSelected === false) {
                  //recuparation du formdata et Object pour l'envoi
                  const createdPost = {
                        post: Object.fromEntries(formPost),
                  };
                  //envoie de la  rzquete pour poster un post
                  await axios
                        .post(sendPOST, createdPost, {
                              headers: {
                                    // 'Content-Type': 'multipart/form-data',
                                    Authorization:
                                          'Bearer ' +
                                          sessionStorage.getItem('token'),
                              },

                              withCredentials: true,
                        })
                        .then((response) => {
                              console.log(
                                    JSON.stringify(response?.data?.message)
                              );
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
                  // si la selection de l'input image est sur true alors envoie de la requete specific
            } else if (isSelected === true) {
                  //utilisation  d'un nouveau tableau de valeur avec le let data stringifié et l'image brute
                  const createdPost = {
                        imageUrl: selectedFile,
                        post: JSON.stringify(data), //probleme d'envoie
                  };
                  //envoi de la requete pour poster une image  avec du texte
                  await axios
                        .post(sendPOST, createdPost, {
                              headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization:
                                          'Bearer ' +
                                          sessionStorage.getItem('token'),
                              },

                              withCredentials: true,
                        })
                        .then((response) => {
                              console.log(
                                    JSON.stringify(response?.data?.message)
                              );
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
                  //une fois la requete envoyer avec limage definir la valeur du use state sur  false pour ne pas renvoyer l'image au second post
                  setIsSelected(false);
            }
            //generation de la notification pendant 4 secondes
            async function masquernotification() {
                  document.getElementById('Message').style.display = 'none';
            }
            window.setTimeout(masquernotification, 4000);
      };
      //creatino d'un compteur de caracteres
      useEffect(() => {
            var textarea = document.querySelector('#CreatePost');
            // On selectionne l'element textarea et l'élement #counterBlock
            var blockCount = document.getElementById('counterBlock');
            //fonction qui limite le nombre  de caracteres  a 280 max
            function count() {
                  // la fonction count calcule la longueur de la chaîne de caractère contenue dans le textarea
                  var count = 280 - textarea.value.length;
                  // et affche cette valeur dans la balise p#counterBlock grâce à innerHTML
                  blockCount.innerHTML = count;
                  // si le count descend sous 0 on ajoute la class red à la balise p#counterBlock du comtpeur
                  if (count < 0) {
                        blockCount.classList.add('red');
                        // si superieur remove  la couleur
                  } else if (count >= 0) {
                        blockCount.classList.remove('red');
                  } else {
                  }
            }
            //recuperation de l'evenement du tappage de caracteres
            textarea.addEventListener('keyup', count);
            //appel de la fonction a chaque tappage
            count();
      });
      //appel de forceUpdate pour refresh un component
      //une fois le post envoyé refresh du component <post />
      const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0); // ligne 47 et 99

      return (
            <div className="BlocPost" aria-label="page home">
                  <div className="BlocCreatePost" aria-label="créer un post">
                        <form className="formPost" onSubmit={handleSubmit}>
                              <label
                                    className="UploadImgPost"
                                    aria-label="inserer une image"
                              >
                                    <FontAwesomeIcon
                                          icon={faImage}
                                          className="UploadImg"
                                    />
                                    <input
                                          type="file"
                                          id="Inputfile"
                                          name="imageUrl"
                                          onChange={(event) => PostImg(event)}
                                    />
                              </label>
                              <textarea
                                    aria-label="entre votre texte pour creer un post"
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
                                          aria-label="message de notification"
                                          id="Message"
                                          ref={errRef}
                                          className={
                                                errMsg
                                                      ? 'errmsgPost'
                                                      : 'offscreen'
                                          }
                                          aria-live="assertive"
                                    >
                                          {errMsg}
                                    </p>
                                    <p
                                          aria-label="compteur de caractère bloqué a 280"
                                          id="counterBlock"
                                    ></p>
                                    <button
                                          aria-label="valider votre post"
                                          className="buttonCreatePost"
                                          id="buttonCreatePost"
                                          disabled={!validPost ? true : false}
                                          onClick={forceUpdate}
                                    >
                                          Envoyer
                                    </button>
                              </div>
                        </form>
                        <div className="fadeGray" />
                  </div>
                  <div aria-label="scroll bar" className="scrollBar">
                        <Post key={reducerValue} />
                  </div>
            </div>
      );
};

export default CreatePost;
