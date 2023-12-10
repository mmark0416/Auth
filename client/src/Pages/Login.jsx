import React from "react";
import {
  Form,
  Link,
  Navigate,
  redirect,
  useActionData,
} from "react-router-dom";
import FormRow from "../Components/FormRow";
import customFetch from "../utils/CustomFetch";
import SubmitBtn from "../Components/SubmitBtn";
import { getUser, saveUser } from "../utils/usaLocalStorage";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const fdata = Object.fromEntries(formData.entries());
  try {
    const { data } = await customFetch.post("/users/login", fdata);
    const id = data?.user?._id;
    saveUser("id", id);
    return redirect("/dashboard");
  } catch (error) {
    return error?.response?.data.error;
  }
};

const Login = () => {
  const error = useActionData() || false;

  const id = getUser("id");

  if (id) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="page">
      <div className="text-4xl text-center">Login</div>
      <Form method="post" className="form">
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn name="login" />
        <p className="mt-4 text-center">
          Dont have an account yet?{" "}
          <Link to={"/register"} className="text-gray-500 hover:underline">
            Register now
          </Link>
        </p>
        <div className="text-center mt-2">
          <Link
            className="hover:underline hover:opacity-75"
            to="/forget-password"
          >
            Forgot your password?
          </Link>
        </div>
        {error && <p className="text-red-600 text-center mt-3">{error}</p>}
      </Form>
    </div>
  );
};

export default Login;
