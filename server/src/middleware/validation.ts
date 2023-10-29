import { body, oneOf } from "express-validator";

export const validateRegistration = [
  body("username", "Username is required.").notEmpty(),
  body("password", "Password is required.").notEmpty(),
  body("email", "Email is required.").notEmpty(),
  body("username", "Username must be between 4 and 15 characters").isLength({
    min: 4,
    max: 15,
  }),
  body("password", "Password must be between 4 and 15 characters").isLength({
    min: 4,
    max: 15,
  }),
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
];
export const validateLogin = [
  body("username", "Username is required.").notEmpty(),
  body("password", "Password is required.").notEmpty(),
  body("username", "Username must be between 4 and 15 characters").isLength({
    min: 4,
    max: 15,
  }),
  body("password", "Password must be between 4 and 15 characters").isLength({
    min: 4,
    max: 15,
  }),
];

export const validateEdititng = [
  body("id", "ID is required").notEmpty(),
  body("id", "ID must be a number").isNumeric(),

  oneOf([body("username").notEmpty(), body("email").notEmpty()], {
    message: "Username or email are required",
  }),
  body("email")
    .if(body("email").notEmpty())
    .isEmail()
    .withMessage("Invalid email format"),
  body("username")
    .if(body("username").notEmpty())
    .isString()
    .isLength({ min: 4, max: 15 })
    .withMessage("Username must be between 4 and 15 characters"),
];
