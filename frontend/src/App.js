import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// restrictino de connection
import RequireAuth from './components/RequireAuth';
// imports des pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileSetting from './pages/ProfileSetting';

import AdminPanel from './pages/AdminPanel';
import LogoutAuth from './components/LogoutAuth';

//mise en place du routeur

function App() {
      return (
            <Router>
                  <Routes>
                        <Route element={<LogoutAuth />}>
                              <Route exact path="/Login" element={<Login />} />

                              <Route
                                    exact
                                    path="/SignUp"
                                    element={<SignUp />}
                              />
                              <Route path="*" element={<Login />} />
                        </Route>
                        <Route element={<RequireAuth />}>
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
                              <Route exact path="*" element={<Home />} />
                        </Route>
                  </Routes>
            </Router>
      );
}

export default App;
