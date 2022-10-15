import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Jwt_Decode from 'jwt-decode';

function RequireAuth() {
      let token = sessionStorage.getItem('token');
      const isLogin = token;

      const initialstate = {
            user: null,
      };

      // const authed = JSON.parse(localStorage.getItem('authed'));
      // const istoken = authed.token;

      let navigate = useNavigate();

      if (isLogin) {
            const jwt_Token_decoded = Jwt_Decode(isLogin);
            console.log('1:' + jwt_Token_decoded.exp * 1000);

            console.log('3: ' + Date.now());
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                  localStorage.clear(); // this runs only when I refresh the page or reload on route change it dosent work
                  sessionStorage.clear();
                  <Navigate to="/login" />;

                  navigate('/login');
            }
      }

      console.log('Is User Login?', isLogin);
      // si un token est présent acces a  la route
      return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAuth;
