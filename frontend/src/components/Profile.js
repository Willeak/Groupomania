import { useState } from 'react';
import { Link } from 'react-router-dom';
//appel du parametre axios
import axios from '../api/axios';
//appel du component disconnect
import Disconnect from './Disconnect';
//appel de font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
// appel de l'image de profil basic
import imgProfile from './../assets/avatar_neutre.png';
// appel du component darkmod
import Darkmod from './Darkmod';

// const userId = sessionStorage.getItem('userId');

const Profile = () => {
      //get value of localstorage
      const authed = JSON.parse(localStorage.getItem('authed'));
      const userId = authed.userId;
      //set value les données sur l'interface utilisateur
      const [name, setName] = useState('');
      const [img, setImg] = useState('');
      const [roles, setRoles] = useState('');
      // appel de l'api
      const USER = `/api/register/${userId}`;
      // recuperation des données de l'utilisateur
      const userSubmit = async (e) => {
            await axios
                  .get(USER, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then(function (response) {
                        setName(response?.data?.user);
                        setImg('http://localhost:3000' + response?.data?.img);
                        setRoles(response?.data?.roles);
                  })
                  .catch((error) => {
                        console.log(JSON.stringify(error));
                  });
      };
      userSubmit();

      // Admin button active si role = admin
      const AdminSubmit = async (e) => {
            //afficher le bouton du panel Admin et le role définie
            if (roles === 'Admin') {
                  console.log('Tu es bien administrateur');
                  let element = document.getElementById('IfAdminRole');
                  element.style.display = 'flex';

                  let admin = document.getElementById('seeRoles');
                  admin.style.display = 'flex';
                  //bloque l'affichage du bouton du panel Admin et le role définie
            } else if (roles === 'User') {
                  let element = document.getElementById('IfAdminRole');
                  element.style.display = 'none';

                  let admin = document.getElementById('seeRoles');
                  admin.style.display = 'none';
            }
      };
      AdminSubmit();

      return (
            <nav
                  aria-label="Navigation"
                  role="navigation"
                  className="profile flex jc__centre ai__centre"
            >
                  <Darkmod />
                  <div className="flex jc__centre ai__centre fd__Column">
                        <div className="circleProfile flex jc__centre ai__centre">
                              <div className="reflect" />
                              <img
                                    aria-label="photo de profil"
                                    src={img}
                                    className="imgProfile"
                                    alt="logo par defaut"
                                    onError={(e) => {
                                          e.target.src = imgProfile;
                                    }}
                              />
                        </div>
                  </div>
                  <p
                        id="seeRoles"
                        className="profileRole"
                        aria-label="mon role"
                  >
                        <FontAwesomeIcon icon={faCrown} className="iconRole" />{' '}
                        {roles}
                  </p>
                  <p className="profileName" aria-label="mon nom">
                        {name}
                  </p>
                  <div className="flex fd__Column panelUser">
                        <div>
                              <FontAwesomeIcon icon={faGear} className="icon" />
                              <Link to="/Profile" element={<Profile />}>
                                    <button
                                          className="profileSetting"
                                          aria-label="Modifier mon profil"
                                    >
                                          Profil
                                    </button>
                              </Link>
                        </div>
                        <Link to="/Profile" element={<Profile />}>
                              <div
                                    className="flex jc__centre ai__centre buttonResponsive"
                                    aria-label="Modifier mon profil"
                              >
                                    <FontAwesomeIcon
                                          icon={faGear}
                                          className="iconAdminResponsive"
                                    />
                              </div>
                        </Link>
                        {/* BOUTON ADMIN PANEL */}
                        <div id="IfAdminRole" className="flex ai__centre">
                              <FontAwesomeIcon
                                    icon={faHammer}
                                    className="iconAdmin"
                              />
                              <Link to="/Admin">
                                    <button
                                          className="AdminButton"
                                          aria-label="panneaux d'administration"
                                    >
                                          Panneau d'administration
                                    </button>
                              </Link>

                              <Link to="/Admin">
                                    <div
                                          className="flex jc__centre ai__centre buttonResponsive"
                                          aria-label="panneaux d'administration"
                                    >
                                          <FontAwesomeIcon
                                                icon={faHammer}
                                                className="iconAdminResponsive"
                                          />
                                    </div>
                              </Link>
                        </div>
                        <Disconnect />
                  </div>
            </nav>
      );
};

export default Profile;
