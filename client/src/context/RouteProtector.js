import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import isAuthenticatedCheck from "../utils/isAuthenticated";

const RouteProtector = () => {
  const isAuthenticated = isAuthenticatedCheck();

  if (!isAuthenticated) {
    return <Navigate to="/login-register/login-register-form" />;
  }

  return <Outlet />;
};

export default RouteProtector;
