import React from 'react';
import axios from '../api/axios';
import Disconnect from './Disconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imgProfile from './../assets/avatar_neutre.png';
import useAuth from '../hooks/useAuth';

const USER = '/api/register/user';

const Profile = () => {
      const userId = sessionStorage.getItem('userId');

      const userSubmit = async (e) => {
            await axios
                  .get(USER, JSON.stringify({ _id: userId }), {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                  })
                  .then(function (response) {
                        // console.log(JSON.stringify(response?.data));
                        console.log(JSON.stringify(response));
                  });
      };

      userSubmit();

      const Name = sessionStorage.getItem('token');

      return (
            <div className="profile flex jc__centre ai__centre">
                  <div className="flex jc__centre ai__centre fd__Column">
                        <div className="circle" />
                        <img
                              src={imgProfile}
                              className="imgProfile"
                              alt="logo par defaut"
                        />
                  </div>
                  <p className="profileName">a</p>
                  <div className="flex jc__centre fd__Column ai__centre">
                        <button className="profileSetting">Profil</button>
                        <Disconnect />
                  </div>
            </div>
      );
};

export default Profile;
