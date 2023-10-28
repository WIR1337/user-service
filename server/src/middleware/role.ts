import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { role } from "../types/user.js";
import { secretKey } from "./auth.js";

export const validateRole = (userRole: role) => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization");

      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied. Token missing." });
      }

      const { role } = jwt.verify(token, secretKey) as JwtPayload;

      const UserHasPermission = role == userRole
      if (!UserHasPermission) {
        return res.status(403).json({ message: "User access denied" });  
      }
      next()

    } catch (error) {
      return res.status(403).json({ message: "Invalid token." });
    }
  };
};
