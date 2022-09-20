import { useRef, useState, useEffect } from 'react';
import {
      Navigate,
      NavLink,
      Link,
      useNavigate,
      useLocation,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Home from '../pages/Home';
import axios from '../api/axios';

const LOGIN_URL = '/api/register/login';

const Connect = () => {
      const { setAuth } = useAuth();

      const userRef = useRef();
      const errRef = useRef();

      const [userId, setUserId] = useState('');
      const [img, setImg] = useState('');
      const [email, setEmail] = useState('');
      const [pwd, setPwd] = useState('');
      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      useEffect(() => {
            userRef.current.focus();
      }, []);

      useEffect(() => {
            setErrMsg();
      }, [email, pwd]);

      const handleSubmit = async (e) => {
            e.preventDefault();

            await axios
                  .post(LOGIN_URL, JSON.stringify({ email, pwd }), {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                  })
                  .then(function (response) {
                        sessionStorage.setItem('userId', response?.data.userId);
                        sessionStorage.setItem('token', response?.data.token);
                        sessionStorage.setItem('roles', response?.data.roles);

                        // console.log(JSON.stringify(response?.data));
                        console.log(JSON.stringify(response));
                        const token = response?.data?.token;
                        const roles = response?.data?.roles;
                        const userId = response?.data?.userId;
                        const email = response?.data?.email;
                        setAuth({ userId, img, email, roles, token });
                        setImg('');
                        setUserId('');
                        setEmail('');
                        setPwd('');
                        setSuccess(true);
                  })
                  .catch(function (error) {
                        if (!error?.response) {
                              setErrMsg('Le serveur ne réponds pas');
                        } else if (error.response?.status === 402) {
                              setErrMsg('Email incorrect');
                        } else if (error.response?.status === 401) {
                              setErrMsg('Mot de passe incorrect');
                        } else {
                              setErrMsg('Connexion échouée');
                        }

                        if (error.response?.status !== undefined) {
                              console.error(error.response?.status); // permet de vois la réponse coté serveur, si connecté message d'erreur en console pour affirmé 0 catch recu
                        }

                        errRef.current.focus();
                  });
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

                              <form
                                    className="formAuth"
                                    onSubmit={handleSubmit}
                              >
                                    <label htmlFor="username">Email :</label>
                                    <input
                                          className="inputAuth"
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
                                          className="inputAuth"
                                          type="password"
                                          id="password"
                                          onChange={(e) =>
                                                setPwd(e.target.value)
                                          }
                                          value={pwd}
                                          required
                                    />
                                    <button className="buttonAuth">
                                          Me connecter
                                    </button>
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
