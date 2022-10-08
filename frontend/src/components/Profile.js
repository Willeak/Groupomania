import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Disconnect from './Disconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

import imgProfile from './../assets/avatar_neutre.png';
import Darkmod from './Darkmod';

// const userId = sessionStorage.getItem('userId');

const Profile = () => {
      const authed = JSON.parse(localStorage.getItem('authed'));

      const [name, setName] = useState('');
      const [img, setImg] = useState('');
      const [roles, setRoles] = useState('');

      const userId = authed.userId;

      const USER = `/api/register/${userId}`;

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

      // admin button active si role = admin
      const AdminSubmit = async (e) => {
            if (roles === 'Admin') {
                  console.log('Tu es bien administrateur');
                  let element = document.getElementById('IfAdminRole');
                  element.style.display = 'flex';

                  let admin = document.getElementById('seeRoles');
                  admin.style.display = 'flex';
            } else if (roles === 'User') {
                  let element = document.getElementById('IfAdminRole');
                  element.style.display = 'none';

                  let admin = document.getElementById('seeRoles');
                  admin.style.display = 'none';
            }
      };

      AdminSubmit();

      return (
            <div className="profile flex jc__centre ai__centre">
                  <Darkmod />
                  <div className="flex jc__centre ai__centre fd__Column">
                        <div className="circleProfile flex jc__centre ai__centre">
                              <div className="reflect" />
                              <img
                                    src={img}
                                    className="imgProfile"
                                    alt="logo par defaut"
                                    onError={(e) => {
                                          e.target.src = imgProfile;
                                    }}
                              />
                        </div>
                  </div>
                  <p id="seeRoles" className="profileRole">
                        <FontAwesomeIcon icon={faCrown} className="iconRole" />{' '}
                        {roles}
                  </p>
                  <p className="profileName">{name}</p>
                  <div className="flex fd__Column panelUser">
                        <div>
                              <FontAwesomeIcon icon={faGear} className="icon" />
                              <Link to="/Profile" element={<Profile />}>
                                    <button className="profileSetting">
                                          Profil
                                    </button>
                              </Link>
                        </div>
                        <Link to="/Profile" element={<Profile />}>
                              <div className="flex jc__centre ai__centre buttonResponsive">
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
                                    <button className="AdminButton">
                                          Panneau d'administration
                                    </button>
                              </Link>

                              <Link to="/Admin">
                                    <div className="flex jc__centre ai__centre buttonResponsive">
                                          <FontAwesomeIcon
                                                icon={faHammer}
                                                className="iconAdminResponsive"
                                          />
                                    </div>
                              </Link>
                        </div>
                        <Disconnect />
                  </div>
            </div>
      );
};

export default Profile;
