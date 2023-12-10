import React from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import FormRow from "../Components/FormRow";
import SubmitBtn from "../Components/SubmitBtn";
import customFetch from "../utils/CustomFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const fData = Object.fromEntries(formData.entries());
  try {
    await customFetch.post("/users/forgot-password", fData);
    return redirect("/");
  } catch (error) {
    return error?.response?.data.error;
  }
};

const ForgetPassword = () => {
  const error = useActionData();
  return (
    <div className="page">
      <div className="text-4xl text-center">Forgot password</div>
      <Form method="post" className="form">
        <FormRow type="email" name="email" />
        <SubmitBtn name="reset password" />
        <div className="mt-4 text-center">
          Already have account?{" "}
          <Link to={"/login"} className="text-gray-500 hover:underline">
            Login in
          </Link>
        </div>
        {error && <p className="text-red-600 text-center mt-3">{error}</p>}
      </Form>
    </div>
  );
};

export default ForgetPassword;
