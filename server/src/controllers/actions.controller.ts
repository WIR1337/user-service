import { Request, Response } from "express";
import ActionsService from "../services/actions.service";
class ActionsController {
  async get(req: Request, res: Response) {
    const {page, perpage,user_id} = req.query

    //  i need to fix this mess
    const validUserId = user_id ? Number(user_id) : undefined
    const users = await ActionsService.get(Number(page),Number(perpage), validUserId);
    res.status(200).json(users);
  }
}

export default new ActionsController();
