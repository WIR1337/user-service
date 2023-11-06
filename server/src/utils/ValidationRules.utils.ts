import { body, oneOf } from "express-validator";

type Field = "username" | "password" | "email";

class ExpressValidator {
  id() {
    return body("id", "id is required")
      .notEmpty()
      .isNumeric()
      .withMessage("id must be a string")
      .isLength({ min: 1, max: 3 })
      .withMessage("Not valid format of id")
  }
  username() {
    return body("username", "username is required")
      .notEmpty()
      .isLength({ min: 4, max: 15 })
      .withMessage("username must be between 4 and 15 characters")
      .isString()
      .withMessage("Not valid format of username")
      
  }

  password() {
    return body("password", "password is required")
      .notEmpty()
      .isLength({ min: 4, max: 15 })
      .withMessage("password must be between 4 and 15 characters");
  }
  email() {
    return body("email", "email is required")
      .notEmpty()
      .isLength({ min: 4, max: 15 })
      .withMessage("email must be between 4 and 15 characters")
      .isEmail()
      .withMessage("Invalid email format");
  }
  oneOfField(fieldOne: Field, fieldTwo: Field) {
    return oneOf([body(fieldOne).notEmpty(), body(fieldTwo).notEmpty()], {
      message: `${fieldOne} or ${fieldTwo} are required`,
    });
  }

  ifUserNameNotEmpty() {
    return body("username")
      .if(body("username").notEmpty())
      .isLength({ min: 4, max: 15 })
      .withMessage("username must be between 4 and 15 characters");
  }
  ifEmailNotEmpty() {
    return body("email")
      .if(body("email").notEmpty())
      .isLength({ min: 4, max: 15 })
      .withMessage("email must be between 4 and 15 characters")
      .isEmail()
      .withMessage("Invalid email format");
  }
}

export default new ExpressValidator();
