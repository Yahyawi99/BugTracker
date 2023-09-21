import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import isAuthenticatedCheck from "../utils/isAuthenticated";

const RouteProtector = () => {
  const isAuthenticated = true;
  isAuthenticatedCheck();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RouteProtector;
