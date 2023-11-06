import { NextFunction, Request, Response } from "express";
import { role } from "../types/user.js";
import { ClientError } from "../utils/ErrorGenerator.utils.js";
import JWT from "../utils/jwt.utils.js";

export const validateRole = (requiredRole: role) => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization");

      if (!token) {
        throw ClientError.unAuth()
      }
      console.log('before')
      const { role } = JWT.getPayLoad(token);
      console.log('after')
      const UserHasPermission = role === requiredRole;

      if (!UserHasPermission) {
        throw ClientError.noPermission()
      }
      next();
    } catch (err) {
      next(err)
    }
  };
};
