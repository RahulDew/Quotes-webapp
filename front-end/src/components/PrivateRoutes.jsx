import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const PrivateRoutes = () => {
  const Location = useLocation();
  const { user } = useAuthContext();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: Location }} replace />
  );
};

export default PrivateRoutes;
