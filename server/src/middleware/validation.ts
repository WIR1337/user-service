import { body } from "express-validator";

export const validateInput = [
  body("username", "Username is required.").notEmpty(),
  body("password", "Password is required.").notEmpty(),
  body("email", "Email is required.").notEmpty(),
  body("username","Username must be between 4 and 15 characters").isLength({ min: 4, max: 15 }),
  body("password","Password must be between 4 and 15 characters").isLength({ min: 4, max: 15 }),
  body("email", "Email must be between 4 and 15 characters").isLength({ min: 4, max: 15 }),
];

export const validateNameAndID = [
  body("username", "Username is required.").notEmpty(),
  body("username","Username must be between 4 and 15 characters").isLength({ min: 4, max: 15 }),
  body("id", "ID is required.").notEmpty(),
  body("id","ID must be between 1 and 10 characters").isLength({ min: 1, max: 10 }),
];

