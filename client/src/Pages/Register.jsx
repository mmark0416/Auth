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
import { getUser } from "../utils/usaLocalStorage";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  try {
    await customFetch.post("/users/register", data);
    return redirect("/login");
  } catch (error) {
    return error?.response?.data.error;
  }
};

const Register = () => {
  const error = useActionData() || false;
  const id = getUser("id");

  if (id) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="page">
      <div className="text-4xl text-center">Register</div>
      <Form method="post" className="form">
        <FormRow type="text" name="name" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn name="register" />
        <p className="mt-4 text-center">
          You have already account?{" "}
          <Link to={"/login"} className="text-gray-500 hover:underline">
            Login in
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-3">{error}</p>}
      </Form>
    </div>
  );
};

export default Register;
