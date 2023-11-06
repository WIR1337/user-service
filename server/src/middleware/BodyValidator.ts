import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ClientError } from "../utils/ErrorGenerator.utils";
import BodyRules from "../utils/ValidationBodyRules.utils";

class BodyValidator {
  login = [BodyRules.username(),BodyRules.password()]
  registration = [BodyRules.username(),BodyRules.password(), BodyRules.email()]
  update = [BodyRules.id(),BodyRules.oneOfField('username','email'), BodyRules.ifUserNameNotEmpty(), BodyRules.ifEmailNotEmpty()]

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
