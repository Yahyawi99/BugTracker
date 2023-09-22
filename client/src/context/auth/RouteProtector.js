import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthenticate from "../../hooks/useAuthenticate";

const RouteProtector = () => {
  const isAuthenticated = useAuthenticate();

  if (!isAuthenticated) {
    return <Navigate to="/login-register/login-register-form" />;
  }

  return <Outlet />;
};

export default RouteProtector;
