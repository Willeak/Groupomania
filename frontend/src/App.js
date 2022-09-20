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
import Profile from './pages/Profile';
import RequireAuth from './components/RequireAuth';

import Layout from './components/Layout';
import UserList from './pages/UserList';

//mise en place du routeur
const App = () => {
      return (
            <Router>
                  <Routes>
                        <Route path="/" element={<Layout />}>
                              <Route exact path="/Login" element={<Login />} />
                              <Route
                                    exact
                                    path="/SignUp"
                                    element={<SignUp />}
                              />

                              <Route exact path="/" element={<Home />} />
                              <Route
                                    exact
                                    path="/Profile"
                                    element={<Profile />}
                              />
                              <Route
                                    exact
                                    path="/Admin"
                                    element={<UserList />}
                              />

                              {/* path="*" revoie vers l'accueil si tout types de liens non existant est appelé dans la barre de recherche */}
                              {<Route exact path="*" element={<Home />} />}
                        </Route>
                  </Routes>
            </Router>

            // <Router>{routesLink}</Router>
      );
};

export default App;
