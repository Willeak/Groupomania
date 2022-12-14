import React, { useEffect, useState, useRef } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
// appel de  font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
      faCheck,
      faTimes,
      faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
// appel du parametre axios
import axios from '../api/axios';
// appel de la page login
import Login from '../pages/Login';

// #1 #2 Regex pour le contrôle des champs Prénom, Nom
const regExPrenomNom = /^[A-Z]{3,23} [A-Z][a-z-]{3,23}$/;

// #3 Regex pour le contrôle du champ Email
const regExEmail =
      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)+.[a-z]{2,4}$/;

// #4 Regex pour le mot de passe devant contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et une longueur d'au moins 10
const regExPassword =
      /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,24}$/;

const REGISTER_URL = '/api/register/signup';

const Register = () => {
      const userRef = useRef();
      const errRef = useRef();

      const [user, setUser] = useState('');
      const [validName, setValidName] = useState(false);
      const [userFocus, setUserFocus] = useState(false);

      const [email, setEmail] = useState('');
      const [validEmail, setValidEmail] = useState(false);
      const [emailFocus, setEmailFocus] = useState(false);

      const [pwd, setPwd] = useState('');
      const [validPwd, setValidPwd] = useState(false);
      const [pwdFocus, setPwdFocus] = useState(false);

      const [matchPwd, setMatchPwd] = useState('');
      const [validMatch, setValidMatch] = useState(false);
      const [matchFocus, setMatchFocus] = useState(false);

      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      useEffect(() => {
            userRef.current.focus();
      }, []);
      //regex appliqué au different formulaire d'inscription
      useEffect(() => {
            setValidName(regExPrenomNom.test(user));
      }, [user]);

      useEffect(() => {
            setValidEmail(regExEmail.test(email));
      }, [email]);

      useEffect(() => {
            setValidPwd(regExPassword.test(pwd));
            setValidMatch(pwd === matchPwd);
      }, [pwd, matchPwd]);

      useEffect(() => {
            setErrMsg('');
      }, [user, pwd, matchPwd]);
      //soumission de la connection
      const handleSubmit = async (e) => {
            e.preventDefault();
            // if button enabled with JS hack
            const v1 = regExPrenomNom.test(user);
            const v2 = regExEmail.test(email);
            const v3 = regExPassword.test(pwd);
            if (!v1 || !v2 || !v3) {
                  setErrMsg('Inscription invalide');
                  return;
            }
            try {
                  const response = await axios.post(
                        REGISTER_URL,
                        JSON.stringify({ user, email, pwd }),
                        {
                              headers: { 'Content-Type': 'application/json' },
                              withCredentials: true,
                        }
                  );

                  setSuccess(true);
                  //clear state and controlled inputs
                  //need value attrib on inputs for this
                  setUser('');
                  setEmail('');
                  setPwd('');
                  setMatchPwd('');
            } catch (error) {
                  if (!error?.response) {
                        setErrMsg('Le serveur ne réponds pas');
                  } else if (error.response?.status === 409) {
                        setErrMsg("Nom d'utilisateur déjà utilisé");
                  } else {
                        setErrMsg('Enregistrement échouée');
                  }
                  errRef.current.focus();
            }
      };

      return (
            <>
                  {success ? (
                        <Navigate to="/login" element={<Login />} />
                  ) : (
                        <section
                              className="responsive"
                              aria-label="formulaire de connexion"
                        >
                              <nav className="flex jc__centre auth">
                                    <NavLink to="/SignUp" className="test">
                                          <li className="stroke">S'inscrire</li>
                                    </NavLink>

                                    <NavLink to="/Login" className="grey">
                                          <li
                                                className="stroke"
                                                aria-label="lien vers se connecter"
                                          >
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
                                          aria-label="label NOM Prénom"
                                          className="labelMarg"
                                          htmlFor="username"
                                    >
                                          NOM Prénom
                                          <FontAwesomeIcon
                                                icon={faCheck}
                                                className={
                                                      validName
                                                            ? 'valid'
                                                            : 'hide'
                                                }
                                          />
                                          <FontAwesomeIcon
                                                icon={faTimes}
                                                className={
                                                      validName || !user
                                                            ? 'hide'
                                                            : 'invalid'
                                                }
                                          />
                                    </label>
                                    <input
                                          aria-label="input NOM Prénom"
                                          className="inputAuth"
                                          type="text"
                                          id="username"
                                          ref={userRef}
                                          autoComplete="off"
                                          onChange={(e) =>
                                                setUser(e.target.value)
                                          }
                                          value={user}
                                          required
                                          aria-invalid={
                                                validName ? 'false' : 'true'
                                          }
                                          aria-describedby="uidnote"
                                          onFocus={() => setUserFocus(true)}
                                          onBlur={() => setUserFocus(false)}
                                    />
                                    <p
                                          id="uidnote"
                                          className={
                                                userFocus && user && !validName
                                                      ? 'instructions'
                                                      : 'offscreen'
                                          }
                                    >
                                          <FontAwesomeIcon
                                                icon={faInfoCircle}
                                          />
                                          Format valide : DUPONT Jean
                                          <br />
                                          4 à 24 caractères valide.
                                          <br />
                                          Doit commencer par une lettre
                                          majuscule.
                                          <br />
                                          Doit être composé uniquement de
                                          letters.
                                    </p>

                                    {/* EMAIL  */}
                                    <label
                                          aria-label="label email"
                                          className="labelMarg"
                                          htmlFor="email"
                                    >
                                          Email
                                          <FontAwesomeIcon
                                                icon={faCheck}
                                                className={
                                                      validEmail
                                                            ? 'valid'
                                                            : 'hide'
                                                }
                                          />
                                          <FontAwesomeIcon
                                                icon={faTimes}
                                                className={
                                                      validEmail || !email
                                                            ? 'hide'
                                                            : 'invalid'
                                                }
                                          />
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
                                          aria-invalid={
                                                validEmail ? 'false' : 'true'
                                          }
                                          aria-describedby="uidnote"
                                          onFocus={() => setEmailFocus(true)}
                                          onBlur={() => setEmailFocus(false)}
                                    />
                                    <p
                                          id="uidnote"
                                          className={
                                                emailFocus &&
                                                email &&
                                                !validEmail
                                                      ? 'instructions'
                                                      : 'offscreen'
                                          }
                                    >
                                          <FontAwesomeIcon
                                                icon={faInfoCircle}
                                          />
                                          format à respecter :
                                          nom.prenom@email.com
                                    </p>

                                    <label
                                          aria-label="label mot de passe"
                                          className="labelMarg"
                                          htmlFor="password"
                                    >
                                          Mot de passe
                                          <FontAwesomeIcon
                                                icon={faCheck}
                                                className={
                                                      validPwd
                                                            ? 'valid'
                                                            : 'hide'
                                                }
                                          />
                                          <FontAwesomeIcon
                                                icon={faTimes}
                                                className={
                                                      validPwd || !pwd
                                                            ? 'hide'
                                                            : 'invalid'
                                                }
                                          />
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
                                          aria-invalid={
                                                validPwd ? 'false' : 'true'
                                          }
                                          aria-describedby="pwdnote"
                                          onFocus={() => setPwdFocus(true)}
                                          onBlur={() => setPwdFocus(false)}
                                    />
                                    <p
                                          id="pwdnote"
                                          className={
                                                pwdFocus && !validPwd
                                                      ? 'instructions'
                                                      : 'offscreen'
                                          }
                                    >
                                          <FontAwesomeIcon
                                                icon={faInfoCircle}
                                          />
                                          8 à 24 caractères necessaire.
                                          <br />
                                          Doit inclure une majuscule et une
                                          minuscule des lettres, un chiffre et
                                          un caractère spécial.
                                          <br />
                                          Doit contenir au moins un caractère
                                          spécial tel que :
                                          <br />{' '}
                                          <span aria-label="exclamation mark">
                                                !
                                          </span>{' '}
                                          <span aria-label="at symbol">@</span>{' '}
                                          <span aria-label="hashtag">#</span>{' '}
                                          <span aria-label="dollar sign">
                                                $
                                          </span>{' '}
                                          <span aria-label="percent">%</span>
                                    </p>

                                    <label
                                          aria-label="confirmer votre mot de passe "
                                          className="labelMarg"
                                          htmlFor="confirm_pwd"
                                    >
                                          Confirmez votre mot de passe
                                          <FontAwesomeIcon
                                                icon={faCheck}
                                                className={
                                                      validMatch && matchPwd
                                                            ? 'valid'
                                                            : 'hide'
                                                }
                                          />
                                          <FontAwesomeIcon
                                                icon={faTimes}
                                                className={
                                                      validMatch || !matchPwd
                                                            ? 'hide'
                                                            : 'invalid'
                                                }
                                          />
                                    </label>
                                    <input
                                          aria-label="input confirmer votre  mot de passe"
                                          className="inputAuth"
                                          type="password"
                                          id="confirm_pwd"
                                          onChange={(e) =>
                                                setMatchPwd(e.target.value)
                                          }
                                          value={matchPwd}
                                          required
                                          aria-invalid={
                                                validMatch ? 'false' : 'true'
                                          }
                                          aria-describedby="confirmnote"
                                          onFocus={() => setMatchFocus(true)}
                                          onBlur={() => setMatchFocus(false)}
                                    />
                                    <p
                                          id="confirmnote"
                                          className={
                                                matchFocus && !validMatch
                                                      ? 'instructions'
                                                      : 'offscreen'
                                          }
                                    >
                                          <FontAwesomeIcon
                                                icon={faInfoCircle}
                                          />
                                          Doit correspondre au premier mot de
                                          passe saisie.
                                    </p>

                                    <button
                                          aria-label="confirmer votre inscription"
                                          className="buttonAuth"
                                          disabled={
                                                !validName ||
                                                !validPwd ||
                                                !validMatch
                                                      ? true
                                                      : false
                                          }
                                    >
                                          S'inscrire
                                    </button>
                              </form>
                              <p>
                                    <span className="flex fd__row-r">
                                          {/*put router link here*/}
                                          <NavLink to="/Login">
                                                <li
                                                      className="italic"
                                                      aria-label="lien vers se connecter"
                                                >
                                                      Déjà inscrit ?
                                                </li>
                                          </NavLink>
                                    </span>
                              </p>
                        </section>
                  )}
            </>
      );
};

export default Register;
