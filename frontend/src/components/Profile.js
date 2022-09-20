import { useEffect, useContext } from 'react';
import axios from '../api/axios';
import Disconnect from './Disconnect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imgProfile from './../assets/avatar_neutre.png';
import useAuth from '../hooks/useAuth';
import AuthContext from '../contexts/AuthProvider';

import { faGear } from '@fortawesome/free-solid-svg-icons';

// const userId = sessionStorage.getItem('userId');

const Profile = () => {
      const { auth } = useAuth(AuthContext);
      console.log(auth);

      const userId = auth.userId;

      const USER = `/api/register/${userId}`;

      const userSubmit = async (e) => {
            await axios
                  .get(USER, {
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                    'jwt' + sessionStorage.getItem('token'),
                              withCredentials: true,
                        },
                  })
                  .then(function (response) {
                        // console.log(JSON.stringify(response?.data));
                        console.log(JSON.stringify(response));
                        console.log(userId);
                  })
                  .catch(function (error) {
                        console.log(JSON.stringify(error));
                  });
      };

      userSubmit();

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
                  <p className="profileName">{auth.userId}</p>
                  <div className="flex fd__Column ">
                        <div>
                              <FontAwesomeIcon icon={faGear} className="icon" />

                              <button className="profileSetting">Profil</button>
                        </div>
                        <Disconnect />
                  </div>
            </div>
      );
};

export default Profile;
