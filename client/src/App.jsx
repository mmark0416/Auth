import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import React from "react";

//components
import Navigation from "./Components/Navigation";

//pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import VerifyEmail from "./Pages/VerifyEmail";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import ProtectedRoute from "./Pages/ProtectedRoute";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";

//actions
import { action as registerAction } from "./Pages/Register";
import { action as loginAction } from "./Pages/Login";
import { action as forgotPasswordAction } from "./Pages/ForgetPassword";
import { action as ResetPasswordAction } from "./Pages/ResetPassword";

//loaders
import { loader as DashboardLodaer } from "./Pages/Dashboard";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login/",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "forget-password/",
          element: <ForgetPassword />,
          action: forgotPasswordAction,
        },
        {
          path: "register/",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "verify-email/",
          element: <VerifyEmail />,
        },
        {
          path: "reset-password/",
          element: <ResetPassword />,
          action: ResetPasswordAction,
        },
        {
          path: "dashboard/",
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <Dashboard />,
              loader: DashboardLodaer,
            },
          ],
        },
      ],
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
