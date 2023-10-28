import { Request, Response } from "express";
import ApiService from "../services/api.service.js";
class ApiController {
  async users(req:Request,res:Response) {
    const data = await ApiService.users()
    res.status(200).json(data)
    // return data
  }
  async create(req:Request,res:Response) {

  }
  async edit(req:Request,res:Response) {

  }
}

export default new ApiController();
