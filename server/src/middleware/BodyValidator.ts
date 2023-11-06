import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ClientError } from "../utils/ClientErrors";
import ExpressValidator from "./ValidationRules";

class BodyValidator {
  login = [ExpressValidator.username(),ExpressValidator.password()]
  registration = [ExpressValidator.username(),ExpressValidator.password(), ExpressValidator.email()]
  update = [ExpressValidator.oneOfField('username','email'), ExpressValidator.ifUserNameNotEmpty(), ExpressValidator.ifEmailNotEmpty()]

  result(req: Request,res:Response,next:NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('validation', errors.array().map((error) => error.msg))
      let errMsgs = errors.array().map((error) => error.msg);
      throw ClientError.badRequest(errMsgs)
    }
    next()
  }
  
}

export default new BodyValidator();
