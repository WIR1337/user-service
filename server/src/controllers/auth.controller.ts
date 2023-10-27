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
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    try {
      const data = await AuthService.registration(username, password);
      
      res.status(201).json(data);
    } catch (err: any) {
      if (err.message == 'User already exist') {
        return res.status(409).json({ error: 'User with the same username already exists.' });
      }
      res.status(500).json(err);
    }
  }
}

export default new AuthController();
