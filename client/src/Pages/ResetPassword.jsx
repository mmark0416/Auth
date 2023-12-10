import React from "react";
import { Form, redirect } from "react-router-dom";
import FormRow from "../Components/FormRow";
import SubmitBtn from "../Components/SubmitBtn";
import customFetch from "../utils/CustomFetch";

export const action = async ({ request }) => {
  const url = new URL(request.url).searchParams
  const formData = await request.formData();
  const fData = Object.fromEntries(formData.entries());
  fData.token = url.get("token")
  fData.email = url.get("email")
  try {
    await customFetch.post("users/reset-password", fData);
    return redirect("/login");
  } catch (error) {
    return error?.response?.data.error;
  }
};

const ResetPassword = () => {
  return (
    <div className="page">
      <div className="text-4xl text-center">Reset Password</div>
      <Form method="post" className="form">
        <FormRow type="password" name="newPassword" label="new password" />
        <FormRow
          type="password"
          name="newPasswordAgain"
          label="new password again"
        />
        <SubmitBtn name="reset password" />
      </Form>
    </div>
  );
};

export default ResetPassword;
