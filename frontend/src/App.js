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
// import AuthenticatedRoute from './components/AuthenticatedRoute';
// import axios from 'axios';
import jwt_decode from 'jwt-decode';

// // check jwt token
// export const setAuthToken = (accessToken) => {
//       if (accessToken) {
//             axios.defaults.headers.common[
//                   'Authorization'
//             ] = `Bearer ${accessToken}`;
//       } else delete axios.defaults.headers.common['Authorization'];
// };

// const accessToken = localStorage.getItem('accessToken');
// if (accessToken) {
//       setAuthToken(accessToken);
// }

const isMyTokenValid = () => {
      if (sessionStorage.getItem('accessToken')) {
            const decodedToken = jwt_decode(
                  sessionStorage.getItem('accessToken')
            );
            const dateNow = new Date();
            if (decodedToken.exp > dateNow / 1000) {
                  return true;
            } else {
                  sessionStorage.clear();
                  window.location = '/login';
            }
      }
};

const PrivateRoute = ({ component: Component, path }) => {
      return (
            <Route
                  exact
                  path={path}
                  render={() =>
                        isMyTokenValid() ? (
                              <Component />
                        ) : (
                              <Navigate to="/login" />
                        )
                  }
            ></Route>
      );
};

//mise en place du routeur
const App = () => {
      return (
            <Router>
                  <Routes>
                        <Route exact path="/Login" element={<Login />} />
                        <Route exact path="/SignUp" element={<SignUp />} />

                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/Profile" element={<Profile />} />

                        {/* path="*" revoie vers l'accueil si tout types de liens non existant est appelé dans la barre de recherche */}
                        {<Route exact path="*" element={<Home />} />}
                  </Routes>
            </Router>
      );
};

export default App;
