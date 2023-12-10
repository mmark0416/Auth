import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/CustomErrors.js";
import User from "../models/User.model.js";
import Token from "../models/Token.model.js";
import { attachCookiesToResponse } from "../utils/jwt.js";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { sendForgotPasswordEmail } from "../utils/sendResetPasswordEmail.js";

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) throw new BadRequestError("Email already exists");

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const newUser = await User.create({
    email,
    name,
    password,
    role,
    verificationToken,
  });

  const tempOrigin = req.get("origin");

  await sendVerificationEmail({
    name: name,
    email: email,
    verificationToken: verificationToken,
    origin: tempOrigin,
  });

  res.json(newUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError("Invalid credentials");
  const isValidUser = await user.comparePassword(password);
  if (!isValidUser) throw new UnauthenticatedError("Invalid credentials");

  if (!user.isVerified)
    throw new UnauthenticatedError("Please verify your email");

  let refreshToken = "";

  const existingToken = await Token.findOne({ user: user._id });

  const tokenUser = { _id: user._id, email: user.email, role: user.role };

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError("Invalid crendentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    return res.status(StatusCodes.OK).json({ user: tokenUser });
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];

  await Token.create({ refreshToken, ip, userAgent, user: user._id });

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError("Verifaction Failed");

  if (user.verificationToken !== verificationToken)
    throw new UnauthenticatedError("Verifaction Failed");

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json("Email confirmed");
};

export const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user._id });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const getUser = (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError("Invalid email");

  const tempOrigin = req.get("origin");

  const passwordToken = crypto.randomBytes(70).toString("hex");

  const tenMinutes = 1000 * 60 * 10;
  const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

  user.passwordToken = passwordToken;
  user.passwordTokenExpirationData = passwordTokenExpirationDate;
  await user.save();

  await sendForgotPasswordEmail({
    email: user.email,
    name: user.name,
    passwordToken,
    origin: tempOrigin,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Your reset password link was sent to your email" });
};

export const resetPassword = async (req, res) => {
  const { newPassword, newPasswordAgain, token, email } = req.body;

  if (newPassword !== newPasswordAgain)
    throw new BadRequestError("Password must match");

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError("Invalid email");

  const currentDate = new Date();

  if (
    user.passwordToken === token &&
    user.passwordTokenExpirationData > currentDate
  ) {
    user.password = newPassword;
    user.passwordToken = null;
    user.passwordTokenExpirationData = null;
    await user.save();
  } else {
    console.log("here");
    throw new UnauthenticatedError("Invalid token");
  }

  res.status(StatusCodes.OK).json({ msg: "reste password " });
};
