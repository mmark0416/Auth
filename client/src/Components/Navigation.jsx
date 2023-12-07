import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import { removeUser } from "../utils/usaLocalStorage";

const Navigation = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const logout = async () => {
    removeUser("id");
    await customFetch.post("/users/logout");
    navigate("/");
  };

  return (
    <div>
      <nav className="flex items-center justify-between py-8 px-12 bg-white">
        <div className="text-4xl font-bold">AUTH</div>
        {id && (
          <button
            className="bg-slate-200 rounded-md p-2 hover:bg-slate-500 hover:text-white"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
