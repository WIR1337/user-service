import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const secretKey = "MY_SECRET_KEY";

export const generateAccessToken = (name: string) => {
  const payload = {
    name,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }
  console.log({ token });
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};
