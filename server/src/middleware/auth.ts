import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { role } from "../types/user.js";
config();

export const secretKey = process.env.SECRET_KEY || "MY_SECRET_KEY";

export const generateAccessToken = (name: string, id: number, role: role) => {
  const payload = {
    name,
    id,
    role
  };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};