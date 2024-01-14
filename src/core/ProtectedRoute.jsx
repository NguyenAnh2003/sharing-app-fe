import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = useAuth();
  console.log(isAuth);
  /**
   * Route used for authenticated route
   * protect all route in app
   */
  return isAuth === true ? (
    children
  ) : (
    <Navigate to={'/signin'} state={{ from: location?.pathname }} replace />
  );
};

export default ProtectedRoute;
