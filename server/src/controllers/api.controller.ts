import { Request, Response } from "express";
import ApiService from "../services/api.service.js";
class ApiController {
  async users(req: Request, res: Response) {
    // remove trycatch by creating Middleware for Error handlong
    try {
      const users = await ApiService.users();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const { action_id, created_user } = await ApiService.create(username,email,password);
    
    res.status(200).json({ action_id, created_user });
  }
  async update(req: Request, res: Response) {
    const { id, username, email } = req.body;

    try {
      // Number(id) must be removed and checked in validation
      const { action_id, updatedUser } = await ApiService.update(
        Number(id),
        username,
        email
      );

      res.status(200).json({ action_id, updatedUser });
    } catch (err: any) {
      if (err.message == "User doesn't exist") {
        return res.status(409).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ApiController();
