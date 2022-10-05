import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import axios from '../api/axios';

import imgProfile from './../assets/avatar_neutre.png';

const UserList = () => {
      const USERSList = `/api/register/`;

      // user list permetant la filtration via la search bar
      const [users, setUsers] = useState([]);
      //response original
      const [OriginListUser, setOriginListUser] = useState([]);
      console.log(users);

      // ======================================

      const userSubmit = async (e) => {
            await axios
                  .get(USERSList, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then((response) => {
                        // console.log(JSON.stringify(response));

                        setUsers(response?.data?.users);
                        setOriginListUser(response?.data?.users);
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

      const [name, setName] = useState('');

      async function filter(e) {
            const keyword = e.target.value;

            if (keyword !== '') {
                  // permet la filtration de la requete via l'email unique de chaque utilisateur sur la search bar
                  const results = OriginListUser.filter((user) => {
                        return user.email
                              .toLowerCase()
                              .startsWith(keyword.toLowerCase());
                  });
                  setUsers(results);
            } else {
                  // si la recherche est vide, alors afficher la requete complete
                  setUsers(userSubmit);
            }

            setName(keyword);
      }

      // supprimer un utilisateur via le bouton
      async function deleteUser(id) {
            const DELETEUser = `/api/register/${id}`;

            await axios
                  .delete(DELETEUser, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'Bearer ' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then((response) => {
                        console.log(JSON.stringify(response));
                        // si la suppression est validé alors recharger la liste d'utilisateurs
                        userSubmit();
                  })
                  .catch((error) => {
                        if (!error?.response) {
                              console.log(error);
                        }
                  });

            console.log(id);
      }

      return (
            <div className="flex fd__Column ai__centre">
                  <div className="NavBar flex ai__centre jc__SpaceB d_nonePC">
                        <div className="accueil jc__centre ai__centre">
                              <Link to="/">
                                    <button className="homelink">
                                          Accueil
                                    </button>
                              </Link>
                        </div>
                        <img
                              src="/static/media/icon-left-font.e44e3642ed0ba08e9dda.png"
                              alt="logo Groupomania"
                              class="logoAdminPanel"
                        />
                        <div className="recherche jc__centre ai__centre">
                              <input
                                    type="search"
                                    value={name}
                                    onChange={filter}
                                    className="inputPost"
                                    id="inputSearch"
                                    placeholder="Entrer un Email..."
                              />
                        </div>
                  </div>
                  <div className="NavBar flex ai__centre jc__SpaceB d_noneMobile">
                        <img
                              src="/static/media/icon-left-font.e44e3642ed0ba08e9dda.png"
                              alt="logo Groupomania"
                              class="logoAdminPanel"
                        />
                        <div className="flex size100">
                              <div className="accueil jc__centre ai__centre">
                                    <Link to="/">
                                          <button className="homelink">
                                                <FontAwesomeIcon
                                                      icon={faHouse}
                                                />
                                          </button>
                                    </Link>
                              </div>
                              <div className="recherche jc__centre ai__centre">
                                    <input
                                          type="search"
                                          value={name}
                                          onChange={filter}
                                          className="inputPost"
                                          id="inputSearch"
                                          placeholder="Entrer un Email..."
                                    />
                              </div>
                        </div>
                  </div>
                  <div className="BlocUserList">
                        <div className="flex jc__centre ai__centre fd__Column">
                              <div className="flex centerResponsive ai__centre jc__SpaceB size100">
                                    <ul className="photo d_none">Photo</ul>
                                    <ul className="Nom">Nom</ul>
                                    <ul className="email d_none">Email</ul>
                                    <ul className="userId d_none">UserId</ul>
                                    <ul className="role d_none">Role</ul>
                                    <ul className="suppr d_none">Supprimer</ul>
                              </div>

                              {users && users.length > 0 ? (
                                    users.map((register, index) => (
                                          <form
                                                className="flex ai__centre jc__SpaceB User size100"
                                                key={index}
                                          >
                                                <img
                                                      src={
                                                            'http://localhost:3000' +
                                                            register.img
                                                      }
                                                      id="imgProfileDefault"
                                                      className="imgUser"
                                                      alt="logo par defaut"
                                                      onError={(e) => {
                                                            e.target.src =
                                                                  imgProfile;
                                                      }}
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
                                                <button
                                                      type="button"
                                                      className="SettingsUser suppr"
                                                      onClick={() =>
                                                            deleteUser(
                                                                  register._id
                                                            )
                                                      }
                                                >
                                                      <FontAwesomeIcon
                                                            icon={faUserSlash}
                                                      />
                                                </button>
                                          </form>
                                    ))
                              ) : (
                                    <p className="errmsgUser">
                                          Aucun utilisateur n'a été trouvé !
                                    </p>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default UserList;