import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, children }) => {
  const location = useLocation();
  /**
   * Route used for authenticated route
   * protect all route in app
   */
  if (isAuth === false)
    return <Navigate to={'/signin'} state={{ from: location?.pathname }} replace />;
  return children;
};

export default ProtectedRoute;
