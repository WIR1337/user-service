import { Request, Response } from "express";
import ActionsService from '../services/actions.service';
class ActionsController {
  async get(req: Request, res: Response) {
    const users = await ActionsService.get();
    res.status(200).json(users);
  }
}

export default new ActionsController();
