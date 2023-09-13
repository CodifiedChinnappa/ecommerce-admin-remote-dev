import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth: React.FC = () => {
  const { auth } = useAuth();
  const location = useLocation();
  if (auth?.user?.role?.includes("seller")) {
    return <Outlet />;
  }

  if (auth?.user?.role) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return <Outlet />;

  // return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
