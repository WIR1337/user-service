import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";
class AuthController {
  async login(req: Request, res: Response) {
    const { username, id, role } = req.body;

    const token = await AuthService.login(username, id, role);

    res.status(200).json(token);
  }
  async registration(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const token = await AuthService.registration(username, email, password);
    res.status(201).json(token);
  }
}

export default new AuthController();
