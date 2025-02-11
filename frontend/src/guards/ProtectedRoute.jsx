/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const ProtectedRoute = ({ children,allowedRoles }) => {
  const { user, loading,authenticated } = useContext(AuthContext);
  const [checked, setChecked] = useState(false)


  useEffect(()=>{

  setChecked(true)
  },[user, authenticated])
  
  if (loading) return <div>Loading...</div>;

  if (checked && !authenticated) return <Navigate to="/login" />;

  if (checked && allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;

    return children;

 
};

export default ProtectedRoute;

