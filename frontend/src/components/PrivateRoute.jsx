import React, { useContext, useState, createContext } from "react";
import { Navigate } from "react-router-dom";

// 1. Create Auth Context
const AuthContext = createContext(null);

// 2. Custom hook (defined in the same file)
const useAuth = () => useContext(AuthContext);

// 3. Auth Provider to wrap your app (export this to use in App.js)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
