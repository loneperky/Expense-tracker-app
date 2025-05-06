import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState  (null);
  const [Data, setData] = useState  (null);
  
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:7000/auth/profile', { withCredentials: true });
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