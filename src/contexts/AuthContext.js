import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/check');
      if (response.status === 200) {
        setIsAuthenticated(true);
        setRole(response.data.role);
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);

    localStorage.removeItem('adminActiveTab');
    localStorage.removeItem('hrActiveTab');
    localStorage.removeItem('candidateActiveTab');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
