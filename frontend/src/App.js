import React, { useState, useEffect } from 'react';
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

import AdminPanel from './pages/AdminPanel';

//mise en place du routeur

function App() {
      return (
            <Router>
                  <Routes>
                        <Route exact path="/Login" element={<Login />} />

                        <Route exact path="/SignUp" element={<SignUp />} />

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
