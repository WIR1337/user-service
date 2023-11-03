import { Request, Response } from "express";
import BodyValidator from "../middleware/validation.js";
import AuthService from "../services/auth.service.js";
class AuthController {
  async login(req: Request, res: Response) {
    const errors = BodyValidator.result(req);
    if (errors[0]) {
      return res.status(400).json({ errors });
    }
    const { username, password } = req.body;

    try {
      console.log({ username, password });
      const token = await AuthService.login(username, password);
      res.status(200).json(token);
    } catch (err: any) {
      if (err.message == "No users found") {
        return res.status(409).json({ message: err.message });
      } else if (err.message == "Incorrect password") {
        return res.status(409).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }
  async registration(req: Request, res: Response) {
    const errors = BodyValidator.result(req);

    if (errors[0]) {
      return res.status(400).json({ errors });
    }

    const { username, email, password } = req.body;

    try {
      const token = await AuthService.registration(username, email, password);
      res.status(201).json(token);
    } catch (err: any) {
      if (err.message == "User already exist") {
        return res
          .status(409)
          .json({message: err.message});
      }
      res.status(500).json({message: err.message});
    }
  }
}

export default new AuthController();
