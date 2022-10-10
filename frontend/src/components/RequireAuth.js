import { Navigate, Outlet } from 'react-router-dom';

function RequireAuth() {
      let token = sessionStorage.getItem('token');
      const isLogin = token;
      console.log('Is User Login?', isLogin);
      // si un token est présent acces a  la route
      return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAuth;
