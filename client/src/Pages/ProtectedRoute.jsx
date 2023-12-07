import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/usaLocalStorage.js";

const ProtectedRoute = () => {
  const id = getUser("id");

  return id ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
