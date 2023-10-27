import { Request, Response } from "express";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Login" });
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
