import { Request, Response } from "express";
import BodyValidator from '../middleware/validation.js';
import AuthService from "../services/auth.service.js";
class AuthController {
  async login(req: Request, res: Response) {
    const errors = BodyValidator.result(req);
    if (errors[0]) {
      return res.status(400).json({ errors });
    }
    const { username, password } = req.body;
    
    try {
      const data = await AuthService.login(username, password);
      res.status(200).json(data);
    } catch (err: any) {
      // i think i can simplify this logic
      if (err.message == "User doesn't exist") {
        return res.status(409).json({ error: `User ${username} is not found` });
      } else if (err.message == "Incorrect password") {
        return res.status(409).json({ error: `Incorrect password` });
      }
      res.status(500).json(err);
    }
  }
  async registration(req: Request, res: Response) {
    const errors = BodyValidator.result(req);
    if (errors[0]) {
      return res.status(400).json({ errors });
    }

    const { username, email, password } = req.body;

    try {
      const data = await AuthService.registration(username, email, password);
      res.status(201).json(data);
    } catch (err: any) {
      if (err.message == "User already exist") {
        return res
          .status(409)
          .json({ error: "User with the same username already exists." });
      }
      res.status(500).json(err);
    }
  }
}

export default new AuthController();
