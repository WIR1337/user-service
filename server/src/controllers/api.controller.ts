import { Request, Response } from "express";
import BodyValidator from '../middleware/validation.js';
import ApiService from "../services/api.service.js";
class ApiController {
  async users(req: Request, res: Response) {
    try {
      const data = await ApiService.users();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async create(req: Request, res: Response) {
    const errors = BodyValidator.result(req);
    
    if (errors[0]) {
      return res.status(400).json({ errors });
    }

    const { username, email, password } = req.body;

    try {
      const {id,user_id} = await ApiService.create(username, email, password);
      res.status(200).json({ message: "User has been successfully created" , id, user_id});
    } catch (err: any) {
      if (err.message == "User already exist") {
        return res
          .status(409)
          .json({ error: "User with the same username already exists." });
      }
      res.status(500).json(err);
    }
  }
  async edit(req: Request, res: Response) {
    const errors = BodyValidator.result(req);
    if (errors[0]) {
      return res.status(400).json({ errors });
    }
    const { id, username, email } = req.body;

    try {
      const data = await ApiService.edit(Number(id), username,email);
      res
        .status(200)
        .json({ message: "User data has been successfully updated" , id: data.id});
    } catch (err: any) {
      if (err.message == "User doesn't exist") {
        return res
          .status(409)
          .json({ error: "User with this ID doesn't exists." });
      }
      res.status(500).json(err);
    }
  }
}

export default new ApiController();
