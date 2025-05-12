import { Outlet, Navigate } from 'react-router-dom';
import Cookies from "js-cookie";


const PrivateRoute = () => {
  const isAuthenticated = Cookies.get("authToken") ? true : null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;