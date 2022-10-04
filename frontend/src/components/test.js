import React from 'react';
import {
      BrowserRouter as Router,
      Routes,
      Route,
      Navigate,
} from 'react-router-dom';

// import des pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileSetting from './pages/ProfileSetting';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './contexts/AuthProvider.js';
import jwt_decode from 'jwt-decode';

import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel';

//mise en place du routeur

const isMyTokenValid = () => {
      if (localStorage.getItem('token')) {
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            const dateNow = new Date();
            if (decodedToken.exp > dateNow / 1000) {
                  return true;
            } else {
                  localStorage.clear();
                  window.location = '/login';
            }
      }
};

const PrivateRoute = ({ component: children, path }) => {
      return (
            <Route
                  exact
                  path={path}
                  render={() =>
                        isMyTokenValid() ? (
                              { children }
                        ) : (
                              <Navigate to="/login" />
                        )
                  }
            ></Route>
      );
};

const App = () => {
      let token = localStorage.getItem('token');

      let routesLink;
      //
      if (token) {
            routesLink = (
                  <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                              exact
                              path="/Profile"
                              element={<ProfileSetting />}
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
            );
      } else {
            routesLink = (
                  <Routes>
                        <Route exact path="/Login" element={<Login />} />
                        <Route exact path="/SignUp" element={<SignUp />} />
                        <Route
                              path="*"
                              element={<Navigate to="/Login" replace />}
                        />
                  </Routes>
            );
      }

      return (
            <Router>
                  <Routes>
                        <Route path="/" element={<Layout />}>
                              {/* ++++++++++++++++++  ROUTE FOR USER LOGGOUT ++++++++++++++++++ */}
                              <Route exact path="/Login" element={<Login />} />
                              <Route
                                    exact
                                    path="/SignUp"
                                    element={<SignUp />}
                              />

                              {/* ++++++++++++++++++ PRIVATE ROUTE FOR USER LOGGED ++++++++++++++++++ */}

                              <Route exact path="/" element={<Home />} />
                              <Route
                                    exact
                                    path="/Profile"
                                    element={<ProfileSetting />}
                              />
                              <Route
                                    exact
                                    path="/Admin"
                                    element={<AdminPanel />}
                              />
                              {/* path="*" revoie vers l'accueil si tout types de liens 
                                    non existant est appelé dans la barre de recherche */}
                              {<Route exact path="*" element={<Home />} />}
                        </Route>
                  </Routes>
            </Router>
      );
};

export default App;
