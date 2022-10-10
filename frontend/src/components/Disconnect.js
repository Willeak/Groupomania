import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//appe lde font  awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
// appel du compoenent  Login
import Login from './../pages/Login';
//appel de authContext
import AuthContext from '../contexts/AuthProvider';

const Disconnect = () => {
      //appel du useAuth
      const { setAuth } = useContext(AuthContext);
      //fontion pour clear   sessionStorage,  localStorage et useAuth
      const DisconnectButton = async (e) => {
            sessionStorage.clear();
            localStorage.clear();
            setAuth({});
      };

      return (
            <div className="disconnectResponsive">
                  <FontAwesomeIcon icon={faDoorOpen} className="icon" />
                  <Link to="/login" element={<Login />}>
                        <button
                              onClick={DisconnectButton}
                              className="DisconnectButton"
                        >
                              Déconnecter
                        </button>
                  </Link>
                  <Link to="/login" element={<Login />}>
                        <div className="flex jc__centre ai__centre buttonResponsive">
                              <FontAwesomeIcon
                                    icon={faDoorOpen}
                                    className="iconAdminResponsive"
                                    onClick={DisconnectButton}
                              />
                        </div>
                  </Link>
            </div>
      );
};

export default Disconnect;
