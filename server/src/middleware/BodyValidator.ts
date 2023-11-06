import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ExpressValidator from "./ValidationRules";

class BodyValidator {
  login = [ExpressValidator.username(),ExpressValidator.password()]
  registration = [ExpressValidator.username(),ExpressValidator.password(), ExpressValidator.email()]
  update = [ExpressValidator.oneOfField('username','email'), ExpressValidator.ifUserNameNotEmpty(), ExpressValidator.ifEmailNotEmpty()]

  result(req: Request,res:Response) {
    const errors = validationResult(req);
    var messages = [];
    if (!errors.isEmpty()) {
      messages = errors.array().map((error) => error.msg);
    }
    return messages;
  }
  
}

export default new BodyValidator();
