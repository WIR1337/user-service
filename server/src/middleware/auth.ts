import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { role } from "../types/user.js";
config();

const secretKey = process.env.SECRET_KEY || "MY_SECRET_KEY";

export const generateAccessToken = (name: string, id: number, role: role) => {
  const payload = {
    name,
    id,
    role
  };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. Token missing." });
    }
    const decoded = jwt.verify(token, secretKey);
    // req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};
