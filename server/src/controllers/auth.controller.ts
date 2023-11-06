import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";
class AuthController {
  async login(req: Request, res: Response) {
    const { username, id, role } = req.body;
    
    const token = await AuthService.login(username, id, role);
    
    res.status(200).json(token);
  }
  async registration(req: Request, res: Response) {
    // this is part of validation
    // const errors = BodyValidator.result(req);
    // if (errors[0]) {
    // return res.status(400).json({ errors });
    // }

    const { username, email, password } = req.body;

    // i need to remove this trycatch by creating Middleware for error handling
    try {
      const token = await AuthService.registration(username, email, password);
      res.status(201).json(token);
    } catch (err: any) {
      if (err.message == "User already exist") {
        return res.status(409).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }
}

export default new AuthController();
