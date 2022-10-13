import { Navigate, Outlet } from 'react-router-dom';

function LogoutAuth() {
      let token = sessionStorage.getItem('token');
      const isLogin = token;
      // si un token est présent acces a  la route
      return isLogin === null ? <Outlet /> : <Navigate to="/" />;
}

export default LogoutAuth;
