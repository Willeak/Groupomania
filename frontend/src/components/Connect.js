import { useRef, useState, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
//appel de la pagee Home
import Home from '../pages/Home';
//appel du parametre axios
import axios from '../api/axios';

//appel de  l'api
const LOGIN_URL = '/api/register/login';

const Connect = () => {
      const userRef = useRef();
      const errRef = useRef();
      //set  value dans le local storage
      const [userId, setUserId] = useState('');
      const [img, setImg] = useState('');
      const [email, setEmail] = useState('');
      const [pwd, setPwd] = useState('');
      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);
      // sert a afficher une message  d'erreur si retour catch
      useEffect(() => {
            userRef.current.focus();
      }, []);

      useEffect(() => {
            setErrMsg();
      }, [email, pwd]);
      //soumission du  formulaire
      const handleSubmit = async (e) => {
            e.preventDefault();
            //requete axios pour se connecter
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
                        const token = response?.data?.token;
                        const roles = response?.data?.roles;
                        const userId = response?.data?.userId;
                        const email = response?.data?.email;
                        const user = response?.data?.user;
                        const img = response?.data?.img;

                        localStorage.setItem(
                              'authed',
                              JSON.stringify({
                                    userId,
                                    token,
                                    user,
                                    img,
                                    email,
                                    roles,
                              })
                        );
                        setImg('');
                        setUserId('');
                        setEmail('');
                        setPwd('');
                        setSuccess(true);
                  })
                  .catch(function (error) {
                        if (!error?.response) {
                              setErrMsg('Le serveur ne r??ponds pas');
                        } else if (error.response?.status === 402) {
                              setErrMsg('Email incorrect');
                        } else if (error.response?.status === 401) {
                              setErrMsg('Mot de passe incorrect');
                        } else {
                              setErrMsg('Connexion ??chou??e');
                        }

                        if (error.response?.status !== undefined) {
                              console.error(error.response?.status); // permet de vois la r??ponse cot?? serveur, si connect?? message d'erreur en console pour affirm?? 0 catch recu
                        }

                        errRef.current.focus();
                  });
      };

      return (
            <>
                  {success ? (
                        <Navigate to="/" element={<Home />} />
                  ) : (
                        <section
                              className="responsive"
                              aria-label="formulaire de connexion"
                        >
                              <nav className="flex jc__centre auth">
                                    <NavLink to="/SignUp" className="grey1">
                                          <li
                                                className="stroke"
                                                aria-label="lien vers s'incrire"
                                          >
                                                S'inscrire
                                          </li>
                                    </NavLink>

                                    <NavLink to="/Login">
                                          <li className="stroke">
                                                Se connecter
                                          </li>
                                    </NavLink>
                              </nav>

                              <p
                                    aria-label="message d'erreur"
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
                                    <label
                                          aria-label="label email"
                                          className="labelMarg"
                                          htmlFor="username"
                                    >
                                          Email :
                                    </label>
                                    <input
                                          aria-label="input email"
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

                                    <label
                                          aria-label="label mot de passe"
                                          className="labelMarg"
                                          htmlFor="password"
                                    >
                                          Mot de passe :
                                    </label>
                                    <input
                                          aria-label="input mot de passe"
                                          className="inputAuth"
                                          type="password"
                                          id="password"
                                          onChange={(e) =>
                                                setPwd(e.target.value)
                                          }
                                          value={pwd}
                                          required
                                    />
                                    <button
                                          className="buttonAuth"
                                          aria-label="bouton me connecter"
                                    >
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
                                                <li
                                                      aria-label="lien vers creer un compte"
                                                      className="italic"
                                                >
                                                      Cr??er un compte ?
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
