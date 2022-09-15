import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './../contexts/AuthProvider';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import { BrowserRouter as Route } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import Home from '../pages/Home';

import axios from '@../../../backend/api/axios';
const LOGIN_URL = '/api/register/login';

const Connect = () => {
      const { setAuth } = useContext(AuthContext);

      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || '/';

      const userRef = useRef();
      const errRef = useRef();

      const [email, setEmail] = useState('');
      const [pwd, setPwd] = useState('');
      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      useEffect(() => {
            userRef.current.focus();
      }, []);

      useEffect(() => {
            setErrMsg('');
      }, [email, pwd]);

      const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                  const response = await axios.post(
                        LOGIN_URL,
                        JSON.stringify({ email, pwd }),
                        {
                              headers: { 'Content-Type': 'application/json' },
                              withCredentials: true,
                        }
                  );
                  console.log(JSON.stringify(response?.data));
                  //console.log(JSON.stringify(response));
                  const accessToken = response?.data?.accessToken;
                  const roles = response?.data?.roles;
                  setAuth({ email, pwd, roles, accessToken });
                  setEmail('');
                  setPwd('');
                  setSuccess(true);
                  navigate(from, { replace: true });
            } catch (err) {
                  if (!err?.response) {
                        setErrMsg('No Server Response');
                  } else if (err.response?.status === 400) {
                        setErrMsg('Missing Username or Password');
                  } else if (err.response?.status === 401) {
                        setErrMsg('Unauthorized');
                  } else {
                        setErrMsg('Login Failed');
                  }
                  errRef.current.focus();
            }
      };

      return (
            <>
                  {success ? (
                        <Route exact path="/" element={<Home />} />
                  ) : (
                        <section>
                              <nav className="flex jc__centre auth">
                                    <NavLink to="/SignUp" className="grey1">
                                          <li className="stroke">S'inscrire</li>
                                    </NavLink>

                                    <NavLink to="/Login">
                                          <li className="stroke">
                                                Se connecter
                                          </li>
                                    </NavLink>
                              </nav>

                              <form onSubmit={handleSubmit}>
                                    <label htmlFor="username">Email :</label>
                                    <input
                                          type="text"
                                          id="email"
                                          ref={userRef}
                                          autoComplete="off"
                                          onChange={(e) =>
                                                setEmail(e.target.value)
                                          }
                                          value={email}
                                          required
                                    />

                                    <label htmlFor="password">
                                          Mot de passe :
                                    </label>
                                    <input
                                          type="password"
                                          id="password"
                                          onChange={(e) =>
                                                setPwd(e.target.value)
                                          }
                                          value={pwd}
                                          required
                                    />
                                    <button>Me connecter</button>
                              </form>
                              <p>
                                    <span className="flex fd__row-r">
                                          {/*put router link here*/}
                                          <NavLink
                                                to="/SignUp"
                                                className="test"
                                          >
                                                <li className="italic">
                                                      Créer un compte ?
                                                </li>
                                          </NavLink>
                                    </span>
                              </p>
                        </section>
                  )}
            </>
      );
};

export default Connect;
