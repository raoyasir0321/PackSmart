import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [ isAuthenticated,setIsAuthenticated] = useState(false)
  const isAuthenticated = !!token;

  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");
    setToken(token);
  }, []);

  // const login = (userData, authToken) => {
  //   setUser(userData);
  //   setToken(authToken);
  //   localStorage.setItem("user", JSON.stringify(userData));
  //   localStorage.setItem("token", authToken);
  // };

  // const signup = (userData, authToken) => {
  //   setUser(userData);
  //   setToken(authToken);
  //   localStorage.setItem("user", JSON.stringify(userData));
  //   localStorage.setItem("token", authToken);
  // };

  const logout = () => {
    // setUser(null);
    setToken(null);
    // localStorage.removeItem("user");
    localStorage.removeItem("tokenAdmin");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, logout, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
