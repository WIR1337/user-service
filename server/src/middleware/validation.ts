import { body } from "express-validator";

export const validateRegistration = [
  body("username", "Username is required.").notEmpty(),
  body("password", "Password is required.").notEmpty(),
  body("username","Username must be between 4 and 15 characters").isLength({ min: 4, max: 15 }),
  body("password","Password must be between 4 and 15 characters").isLength({ min: 4, max: 15 }),
];

