import { Request } from "express";
import { ValidationChain, body, oneOf, validationResult } from "express-validator";
import { IsEmptyOptions } from "express-validator/src/options.js";

type ValidatorOptions = "username" | "password" | "email" | "id";


type ValidatorMethod = {
  [key: string]: (options?: IsEmptyOptions | undefined) => ValidationChain;
};

class BodyValidator {
  private rules: Record<ValidatorOptions, ValidationChain>;

  constructor() {
    this.rules = {
      username: this.fieldRule("username", 4, 15),
      password: this.fieldRule("password", 4, 15),
      email: this.fieldRule("email", 4, 15, ["isEmail"], ["Invalid email format"]
      ),
      id: this.fieldRule("id", 1, 5, ["isNumeric"], ["ID must be a number"]),
    };
  }
  private capitalizeFirstChar(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
 

  private fieldRule(
    field: ValidatorOptions,
    min: number,
    max: number,
    validators?: string[],
    validatorsErrors?: string[]
  ) {
    const label = this.capitalizeFirstChar(field);

    const rule = body(field, `${label} is required`)
      .notEmpty()
      .isLength({ min, max })
      .withMessage(`${label} must be between ${min} and ${max} characters`);

    if (validators && validatorsErrors) {
      for (let i = 0; i < validators.length; i++) {
        const validator = validators[i];
        const errorMessage = validatorsErrors[i];

        (rule as unknown as ValidatorMethod)
          [validator]()
          .withMessage(errorMessage);
      }
    }

    return rule;
  }

  private checkOneOf(one:ValidatorOptions,two:ValidatorOptions) {
    return oneOf([body(one).notEmpty(), body(two).notEmpty()], {
      message: `${one} or ${two} are required`,
    })
  }

  login() {
    return [this.rules.username, this.rules.password];
  }
  registration() {
    return [this.rules.username, this.rules.password, this.rules.email];
  }
  edit() {
    return [this.rules.id,this.checkOneOf('username','email'),this.rules.email,this.rules.username]
  }
  result(req:Request) {
    const errors = validationResult(req);
    var messages = [];
    if (!errors.isEmpty()) {
      messages = errors.array().map((error) => error.msg);
    }
    return messages
  }
}

export default new BodyValidator();
