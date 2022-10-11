import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//appel de axios
import axios from '../api/axios';
//appel de font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// appel de formdata
import FormData from 'form-data';
// appel de l'image de profil basic
import imgProfile from './../assets/avatar_neutre.png';
// appel du logo
import Logo1 from './../assets/icon-left-font.png';

const Profile = () => {
      //recuperation du localstorage
      const authed = JSON.parse(localStorage.getItem('authed'));
      const userId = authed.userId;
      //recuperatino de la requete pour les afficher sur l'interface
      const [user, setUser] = useState('');
      const [name, setName] = useState('');
      const [img, setImg] = useState('');
      const [email, setEmail] = useState('');
      //appel del'api
      const USERget = `/api/register/${userId}`;
      //requete pour recevoir tout les  utilisateurs
      const getInfoUser = async (e) => {
            await axios
                  .get(USERget, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then(function (response) {
                        // console.log(JSON.stringify(response?.data));
                        // console.log(JSON.stringify(response.data));
                        setName(response?.data?.user);
                        setEmail(response?.data?.email);
                        setUser(response?.data.user);
                        setImg('http://localhost:3000' + response?.data?.img); //LOCALHOST A CHANGER SI LE PORT N EST PAS 3000

                        // console.log(response.data);
                  })
                  .catch((error) => {
                        console.log(JSON.stringify(error));
                  });
      };
      getInfoUser();

      // useState qui est definie si une photo de profil est envoyé dans l'input
      const [selectedFile, setSelectedFile] = useState();
      // definie sur true si une image est envoyé a l'input et affiche un tableau de données concernant l'image
      const [isSelected, setIsSelected] = useState(false);
      // au click de l'input file definit le useState
      const changeImg = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
      };
      // appe lde l'api
      const USERputImg = `/api/register/${userId}`;
      // au click envoie la requete pour modifier  la photo de profil
      const ModifyUserImg = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('image', selectedFile, selectedFile.name);
            // execution de la requete
            await axios
                  .put(USERputImg, formData, {
                        headers: {
                              'Content-Type': 'singlepart/form-data',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then((response) => {
                        console.log('Success:', response);
                  })
                  .catch((error) => {
                        console.error('Error:', error);
                  });
            window.location.reload();
      };
      //Darkmod active si refresh ou item present dans le localstorage
      const [active, setActive] = useState();
      useEffect(() => {
            if (localStorage.getItem('DarkMod')) {
                  setActive(localStorage.getItem('DarkMod'));
                  document.body.setAttribute(
                        'theme',
                        active ? 'light' : 'dark'
                  );
            }
      }, []);

      return (
            <div className="flex jc__centre fd__Column ai__centre">
                  <div className="accueilSettings jc__centre ai__centre">
                        <Link to="/">
                              <button
                                    className="homelinkProfile"
                                    aria-label="bouton accueil"
                              >
                                    Accueil
                              </button>
                        </Link>
                  </div>
                  <img
                        src={Logo1}
                        alt="logo Groupomania"
                        className="logoSettings"
                  />
                  <div className="profileWindow flex jc__centre ai__centre">
                        <form
                              className="flex fd__Column jc__centre ai__centre"
                              aria-label="formulaire de modification de post"
                        >
                              <label className="labelMarg" htmlFor="photo">
                                    Photo de profil
                              </label>
                              <div className="circle flex jc__centre ai__centre">
                                    <img
                                          src={img}
                                          className="imgProfileSetting"
                                          id="imgProfileSetting"
                                          alt="logo par defaut"
                                          onError={(e) => {
                                                e.target.src = imgProfile;
                                          }}
                                    />
                              </div>
                              <label
                                    className="UploadImgProfile"
                                    aria-label="inserer une image de profil"
                              >
                                    <FontAwesomeIcon
                                          icon={faImage}
                                          className="UploadImg"
                                    />
                                    <input
                                          type="file"
                                          id="file"
                                          name="image"
                                          onChange={changeImg}
                                    />
                              </label>
                              {isSelected ? (
                                    <div>
                                          <p
                                                className="infoIfImg"
                                                aria-label={
                                                      'nom du fichier selectionné' +
                                                      selectedFile.name
                                                }
                                          >
                                                Nom: {selectedFile.name}
                                          </p>
                                          <p
                                                className="infoIfImg"
                                                aria-label={
                                                      'type du fichier selectionné' +
                                                      selectedFile.type
                                                }
                                          >
                                                Type: {selectedFile.type}
                                          </p>
                                          <p
                                                className="infoIfImg"
                                                aria-label={
                                                      'taille du fichier selectionné' +
                                                      selectedFile.size
                                                }
                                          >
                                                Taille: {selectedFile.size}{' '}
                                                octets
                                          </p>
                                          <p className="infoIfImg">
                                                Date de modification:{' '}
                                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                                          </p>
                                    </div>
                              ) : (
                                    <p className="infoNoImg">
                                          veuillez selectionner une image
                                    </p>
                              )}
                              <div className="flex size100">
                                    <FontAwesomeIcon
                                          icon={faUpload}
                                          className="iconSave"
                                    />
                                    <button
                                          aria-label="bouton envoyer votre nouvelle photo de profil"
                                          id="SendFile"
                                          className="ImgProfileSettingButton flex"
                                          onClick={ModifyUserImg}
                                    >
                                          Envoyer
                                    </button>
                              </div>
                        </form>
                        <form className="flex fd__Column">
                              <label className="labelMarg" htmlFor="username">
                                    NOM Prénom
                              </label>

                              <input
                                    type="text"
                                    value={name || ''}
                                    className="inputSetting"
                                    disabled="disabled"
                              />
                              <label className="labelMarg" htmlFor="email">
                                    Email
                              </label>

                              <input
                                    type="text"
                                    value={email || ''}
                                    className="inputSetting"
                                    disabled="disabled"
                              />
                        </form>
                  </div>
            </div>
      );
};

export default Profile;
