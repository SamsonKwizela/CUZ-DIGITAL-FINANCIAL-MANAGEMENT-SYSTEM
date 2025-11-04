import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userToken) => {
    localStorage.setItem("authToken", userToken);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  // Get token function
  const getToken = () => {
    return token || localStorage.getItem("authToken");
  };

  // Check if user is authenticated
  const checkAuth = () => {
    const currentToken = getToken();
    return !!currentToken;
  };

  const value = {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    getToken,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
