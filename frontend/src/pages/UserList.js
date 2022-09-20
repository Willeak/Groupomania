import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import imgProfile from './../assets/avatar_neutre.png';
import Logo from '../components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {
      return (
            <div className="flex fd__Column ai__centre">
                  <Logo />
                  <div className="accueil jc__centre ai__centre">
                        <Link to="/">
                              <button className="SettingsUser">Accueil</button>
                        </Link>
                  </div>
                  <div className="BlocUserList">
                        <div className="flex jc__centre ai__centre fd__Column">
                              <div className="flex ai__centre jc__SpaceB size100">
                                    <ul className="photo">Photo</ul>
                                    <ul className="Nom">Nom</ul>
                                    <ul className="email">Email</ul>
                                    <ul className="userId">UserId</ul>
                                    <ul className="role">Role</ul>
                                    <ul className="suppr">Supprimer</ul>
                              </div>

                              {/* BLOC USER */}
                              <div className="flex ai__centre jc__SpaceB User size100">
                                    <img
                                          src={imgProfile}
                                          className="imgUser"
                                          alt="logo par defaut"
                                    />
                                    <p className="UserInfo Nom">Jean Dupont</p>
                                    <p className="UserInfo email">
                                          Jean.Dupont@gmail.com
                                    </p>
                                    <p className="UserInfo userId">
                                          ezffzefzefzsfs51f
                                    </p>
                                    <p className="UserInfo role">User</p>
                                    <button className="SettingsUser suppr">
                                          <FontAwesomeIcon icon={faUserSlash} />
                                    </button>
                              </div>

                              <div className="flex ai__centre jc__SpaceB User size100">
                                    <img
                                          src={imgProfile}
                                          className="imgUser"
                                          alt="logo par defaut"
                                    />
                                    <p className="UserInfo Nom">Jean Dupont</p>
                                    <p className="UserInfo email">
                                          Jean.Dupont@gmail.com
                                    </p>
                                    <p className="UserInfo userId">
                                          ezffzefzefzsfs51f
                                    </p>
                                    <p className="UserInfo role">User</p>
                                    <button className="SettingsUser suppr">
                                          <FontAwesomeIcon icon={faUserSlash} />
                                    </button>
                              </div>

                              <div className="flex ai__centre jc__SpaceB User size100">
                                    <img
                                          src={imgProfile}
                                          className="imgUser"
                                          alt="logo par defaut"
                                    />
                                    <p className="UserInfo Nom">Jean Dupont</p>
                                    <p className="UserInfo email">
                                          Jean.Dupont@gmail.com
                                    </p>
                                    <p className="UserInfo userId">
                                          ezffzefzefzsfs51f
                                    </p>
                                    <p className="UserInfo role">User</p>
                                    <button className="SettingsUser suppr">
                                          <FontAwesomeIcon icon={faUserSlash} />
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default UserList;
