import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';
import Login from './../pages/Login';
import AuthContext from '../contexts/AuthProvider';

const Disconnect = () => {
      const { setAuth } = useContext(AuthContext);

      const DisconnectButton = async (e) => {
            sessionStorage.clear();
            setAuth({});
      };

      return (
            <div>
                  <FontAwesomeIcon icon={faDoorOpen} className="icon" />
                  <Link to="/login" element={<Login />}>
                        <button
                              onClick={DisconnectButton}
                              className="DisconnectButton"
                        >
                              Déconnecter
                        </button>
                  </Link>
            </div>
      );
};

export default Disconnect;
