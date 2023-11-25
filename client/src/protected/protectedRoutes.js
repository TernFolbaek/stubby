import React from 'react';
import { useLocation } from 'wouter';

const ProtectedRoute = ({ children }) => {
  const [location, setLocation] = useLocation();
  const token = localStorage.getItem('authToken'); 

  if (!token) {
    setLocation('/');
    return null; 
  }

  return children; 
};

export default ProtectedRoute;
