import { NextFunction, Request, Response } from "express";
import db from "../repository/conflict.queries";
import { ClientError } from "../utils/ErrorGenerator.utils";
import crypto from "../utils/bcrypt.utils.";

class ConflictValidator {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await db.selectUserByName(username);
      if (!user) {
        throw ClientError.notFound();
      }
      const validPassword = crypto.comparePasswords(password, user.password);
      if (!validPassword) {
        throw ClientError.unAuth();
      }

      req.body.id = user.id;
      req.body.role = user.role;
      next();
    } catch (err) {
      next(err);
    }
  }
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;
      const user = await db.selectUserByName(username);
      if (user) {
        throw ClientError.conflict();
      }
      next();
    } catch (err) {
      next(err);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;
      const user = await db.selectUserByName(username);
      if (user) {
        throw ClientError.conflict();
      }
      next();
    } catch (err) {
      next(err);
    }
  }
  
  //   login = [ExpressValidator.username(),ExpressValidator.password()]
  //   registration = [ExpressValidator.username(),ExpressValidator.password(), ExpressValidator.email()]
  //   update = [ExpressValidator.oneOfField('username','email'), ExpressValidator.ifUserNameNotEmpty(), ExpressValidator.ifEmailNotEmpty()]
}

export default new ConflictValidator();
