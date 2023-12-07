import nodemailer from "nodemailer";
import nomdemailerConfig from "./nodemailerConfig.js";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nomdemailerConfig);

  let transport = await transporter.sendMail({
    from: '"Mark" <mark@gmail.com',
    to,
    subject,
    html,
  });
};
