import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormData from 'form-data';

import imgProfile from './../assets/avatar_neutre.png';
import Logo1 from './../assets/icon-left-font.png';

// import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
      const authed = JSON.parse(localStorage.getItem('authed'));

      const [user, setUser] = useState('');
      console.log(user);

      const [name, setName] = useState('');
      const [img, setImg] = useState('');
      const [email, setEmail] = useState('');

      const userId = authed.userId;
      console.log('userId : ' + userId);

      const USERget = `/api/register/${userId}`;

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

      // requete modification profile
      // const USERput = `/api/register/`;

      // const ModifyUser = async (event) => {
      //       event.preventDefault();
      //       await axios
      //             .put(USERput, {
      //                   headers: {
      //                         'Content-Type': 'application/json',
      //                         Authorization:
      //                               'Bearer ' + sessionStorage.getItem('token'),
      //                         withCredentials: true,
      //                   },
      //             })
      //             .then(function (response) {
      //                   // console.log(JSON.stringify(response?.data));
      //                   console.log(JSON.stringify(response));

      //                   setUser(response?.data?.user);

      //                   console.log(response);
      //             })
      //             .catch((error) => {
      //                   console.log(JSON.stringify(error));
      //             });
      // };

      // ENVOIE DE LA NOUVELLE  IMAGE DE PROFIL
      const [selectedFile, setSelectedFile] = useState();
      console.log('image dans l input : ' + selectedFile);
      const [isSelected, setIsSelected] = useState(false);

      const changeImg = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
      };

      const USERputImg = `/api/register/${userId}`;

      const ModifyUserImg = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('image', selectedFile, selectedFile.name);

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

      //========================================================================

      return (
            <div className="flex jc__centre fd__Column ai__centre">
                  <div className="accueilSettings jc__centre ai__centre">
                        <Link to="/">
                              <button className="homelinkProfile">
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
                        <form className="flex fd__Column jc__centre ai__centre">
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
                              <input
                                    type="file"
                                    id="file"
                                    name="image"
                                    onChange={changeImg}
                              />
                              {isSelected ? (
                                    <div>
                                          <p className="infoIfImg">
                                                Nom: {selectedFile.name}
                                          </p>
                                          <p className="infoIfImg">
                                                Type: {selectedFile.type}
                                          </p>
                                          <p className="infoIfImg">
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
                              {/* <label htmlFor="pwd">Mot de passe actuel</label>

                              <input type="text" className="inputSetting" />
                              <label className="labelMarg" htmlFor="newpwd">
                                    Nouveau mot de passe
                              </label>

                              <input type="text" className="inputSetting" />
                              <div className="flex">
                                    <FontAwesomeIcon
                                          icon={faSave}
                                          className="iconSave"
                                    />
                                    <button
                                          className="profileSettingButton flex"
                                          onClick={ModifyUser}
                                    >
                                          Sauvegarder
                                    </button>
                              </div> */}
                        </form>
                  </div>
            </div>
      );
};

export default Profile;
