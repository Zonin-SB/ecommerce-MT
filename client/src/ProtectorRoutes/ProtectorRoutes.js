import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UseAuth = () => {
  const user = useSelector((state) => state.user.userDetails);
  return user;
};
function protectorRoutes() {
  const isAuth = UseAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default protectorRoutes;
