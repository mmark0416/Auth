import { Router } from "express";

import {
  register,
  login,
  verifyEmail,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/Auth.controller.js";
import {
  validateLoginInput,
  validateRegisterInput,
  validateResetPasswordInput
} from "../middleWare/Validation.js";
import { authenticationUser } from "../middleWare/authentication.js";

const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/verify-email", verifyEmail);
router.post("/logout", authenticationUser, logout);
router.post("/user", authenticationUser, getUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password",validateResetPasswordInput, resetPassword);

export default router;
