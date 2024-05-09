import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const PublicRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? <Navigate to='/' replace /> : children;
};

export default PublicRoute;
