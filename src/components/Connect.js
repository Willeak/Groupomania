import { useRef, useState, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { BrowserRouter as Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Home from '../pages/Home';
import axios from '@../../../backend/api/axios';

const LOGIN_URL = '/api/register/login';

const Connect = () => {
      const { setAuth } = useAuth();
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
                  sessionStorage.setItem(
                        response?.data.userId,
                        response?.data.accessToken
                  );
                  sessionStorage.setItem('roles', response?.data.Roles);

                  console.log(JSON.stringify(response?.data));
                  // console.log(JSON.stringify(response));
                  const accessToken = response?.data?.accessToken;
                  const roles = response?.data?.roles;
                  setAuth({ email, pwd, roles, accessToken });
                  setEmail('');
                  setPwd('');
                  setSuccess(true);
            } catch (error) {
                  if (!error?.response) {
                        setErrMsg('Le serveur ne réponds pas');
                  } else if (error.response?.status === 402) {
                        setErrMsg('Email incorrect');
                  } else if (error.response?.status === 401) {
                        setErrMsg('Mot de passe incorrect');
                  } else {
                        setErrMsg('Connexion échouée');
                  }

                  if (error !== undefined) {
                        // permet de vois la réponse coté serveur, si connecté message d'erreur en console pour affirmé 0 catch recu
                  }
                  console.error(error);
                  errRef.current.focus();
            }
      };

      return (
            <>
                  {success ? (
                        <Navigate to="/" element={<Home />} />
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

                              <p
                                    ref={errRef}
                                    className={errMsg ? 'errmsg' : 'offscreen'}
                                    aria-live="assertive"
                              >
                                    {errMsg}
                              </p>

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
