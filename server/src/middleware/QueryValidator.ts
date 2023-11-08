import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ClientError } from "../utils/ErrorGenerator.utils";
import QueryRules from "../utils/ValidationQueryRules.utils";

class QueryValidator {
  get = [QueryRules.page(),QueryRules.perpage(), QueryRules.user_id()];

  result(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(
        "validation",
        errors.array().map((error) => error.msg)
      );
      let errMsgs = errors.array().map((error) => error.msg);
      throw ClientError.badRequest(errMsgs);
    }

    next();
  }
}

export default new QueryValidator();
