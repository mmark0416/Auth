import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/CustomErrors.js";

const withValidationErrorHandler = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        throw new BadRequestError(errorMessages[0]);
      }
      next()
    },
  ];
};

export const validateLoginInput = withValidationErrorHandler([
  body("email")
    .notEmpty()
    .withMessage("email must be provided")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password must be provided"),
]);

export const validateRegisterInput = withValidationErrorHandler([
  body("email")
    .notEmpty()
    .withMessage("email must be provided")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password must be provided"),
  body("name").notEmpty().withMessage("Name must be provided"),
]);
