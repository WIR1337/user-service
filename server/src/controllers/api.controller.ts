import { Request, Response } from "express";
import ApiService from "../services/api.service.js";
class ApiController {
  async users(req: Request, res: Response) {
    const users = await ApiService.users();
    res.status(200).json(users);
  }
  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const { action_id, created_user } = await ApiService.create(username,email,password);
    res.status(200).json({ action_id, created_user });
  }
  async update(req: Request, res: Response) {
    const { id, username, email } = req.body;

    const { action_id, updatedUser } = await ApiService.update(id,username,email);

    res.status(200).json({ action_id, updatedUser });
  }
}

export default new ApiController();
