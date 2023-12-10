import { sendEmail } from "./sendEmail.js";

export const sendForgotPasswordEmail = async ({
  name,
  email,
  passwordToken,
  origin,
}) => {
  const forgotPasswordEmail = `${origin}/reset-password?token=${passwordToken}&email=${email}`;

  const message = `<p>You can reset your password by clicking on the following link: 
  <a href="${forgotPasswordEmail}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${name}</h4>
    ${message}`,
  });
};
