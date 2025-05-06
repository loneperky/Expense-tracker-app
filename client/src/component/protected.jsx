import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState  (null);
  const [Data, setData] = useState  (null);
  
  const navigate = useNavigate()
 const API_URL = 'https://expense-tracker-app-3hti.onrender.com'
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get( `${API_URL}/auth/profile`, { withCredentials: true });
        setIsAuthenticated(true);
        
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : navigate("/login");
};

export default ProtectedRoute;