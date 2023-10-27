import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const data = await AuthService.login();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async registration(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Registration" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new AuthController();
