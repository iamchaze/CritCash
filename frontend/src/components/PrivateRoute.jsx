import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PrivateRoute = () => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`, {
        withCredentials: true,
      })
      .then(() => {
        setAuthorized(true);
        setChecking(false);
      })
      .catch(() => {
        setAuthorized(false);
        setChecking(false);
      });
  }, []);

  if (checking) return <p>Checking session...</p>;

  return authorized ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
