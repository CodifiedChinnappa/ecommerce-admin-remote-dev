import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useAppSelector } from "../../hooks/useReduxHooks";

const RequireAuth: React.FC = () => {
  const userDetails = useAppSelector(selectCurrentUser);

  const location = useLocation();
  if (userDetails?.role?.includes("admin")) {
    return <Outlet />;
  }

  if (userDetails?.role) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
