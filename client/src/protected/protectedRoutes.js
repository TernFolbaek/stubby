import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate for navigation in react-router-dom
  const token = localStorage.getItem('authToken');

  if (!token) {
    navigate('/'); // Redirect to the home page if there is no token
    return null;
  }

  return children; // Render the protected content if the user is authenticated
};

export default ProtectedRoute;
