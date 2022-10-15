import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Jwt_Decode from 'jwt-decode';

function RequireAuth() {
      //token stoké
      let token = sessionStorage.getItem('token');
      const isLogin = token;
      // appel de use route
      let navigate = useNavigate();
      //si le token existe alors
      if (isLogin) {
            //decoder le token
            const jwt_Token_decoded = Jwt_Decode(isLogin);
            //si le token est inferieur a la date alors clear les stockage et renvoyer vers login
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                  localStorage.clear(); // this runs only when I refresh the page or reload on route change it dosent work
                  sessionStorage.clear();
                  <Navigate to="/login" />;
                  navigate('/login');
            }
      }
      // si un token est présent acces a la route
      return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAuth;
