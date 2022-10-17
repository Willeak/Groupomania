import { Navigate, Outlet } from 'react-router-dom';

function LogoutAuth() {
      // appel du token stocké si existant
      let token = localStorage.getItem('authed');
      const isLogin = token;
      // si un token est présent acces a  la route
      return isLogin === null ? <Outlet /> : <Navigate to="/" />;
}

export default LogoutAuth;
