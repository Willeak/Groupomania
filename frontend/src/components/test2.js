import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import imgProfile from './../assets/avatar_neutre.png';
import Logo from '../components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';

const UserList = () => {
      const USERS = `/api/register/`;

      const [users, setUsers] = useState([]);
      console.log(users);

      const userSubmit = async (e) => {
            await axios
                  .get(USERS, {
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

      // This holds a list of some fiction people
      // Some  have the same name but different age and id

      // the value of the search field
      const [name, setName] = useState('');

      function filter(e) {
            const keyword = e.target.value;

            if (keyword !== '') {
                  const results = users.filter((user) => {
                        return user.email
                              .toLowerCase()
                              .startsWith(keyword.toLowerCase());
                        // Use the toLowerCase() method to make it case-insensitive
                  });
                  setUsers(results);
            } else {
                  setUsers(users);
                  // If the text field is empty, show all users
            }

            setName(keyword);
      }

      return (
            <div className="container">
                  <input
                        type="search"
                        value={name}
                        onChange={filter}
                        className="input"
                        placeholder="Filter"
                  />

                  <div className="user-list">
                        {users && users.length > 0 ? (
                              users.map((register) => (
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
                              ))
                        ) : (
                              <h1>No results found!</h1>
                        )}
                  </div>
            </div>
      );
};

export default UserList;
