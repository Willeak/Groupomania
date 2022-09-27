import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import imgProfile from './../assets/avatar_neutre.png';
import Logo from '../components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';

const UserList = () => {
      const USER = `/api/register/`;

      const [users, setUsers] = useState([]);
      console.log(users);

      const userSubmit = async (e) => {
            await axios
                  .get(USER, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization: sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then((response) => {
                        // console.log(JSON.stringify(response));
                        setUsers(response?.data?.users);
                  })
                  .catch((error) => {
                        if (!error?.response) {
                              console.log(error);
                        }
                  });
      };

      useEffect(() => {
            userSubmit();
      }, []);

      // ======================================================================

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

                              {users.map((register) => {
                                    return (
                                          <div
                                                className="flex ai__centre jc__SpaceB User size100"
                                                key={register}
                                          >
                                                <img
                                                      src={register.img}
                                                      className="imgUser"
                                                      alt="logo par defaut"
                                                />
                                                <p className="UserInfo Nom">
                                                      {register.user}
                                                </p>
                                                <p className="UserInfo email">
                                                      {register.email}
                                                </p>
                                                <p className="UserInfo userId">
                                                      {register._id}
                                                </p>
                                                <p className="UserInfo role">
                                                      {register.roles}
                                                </p>
                                                <button className="SettingsUser suppr">
                                                      <FontAwesomeIcon
                                                            icon={faUserSlash}
                                                      />
                                                </button>
                                          </div>
                                    );
                              })}
                        </div>
                  </div>
            </div>
      );
};

export default UserList;
