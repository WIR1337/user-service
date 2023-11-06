import { role } from '@types';
import db from "../repository/auth.queries.js";
import crypto from "../utils/bcrypt.utils..js";
import JWT from '../utils/jwt.utils.js';

class AuthService {
  async login(username: string, id: number,role:role) {
    
    const token = JWT.generateAccessToken(username, id, role);
    return { token };
  }
  async registration(username: string, email: string, password: string) {
    const role = "admin";

    const hashedPassword = crypto.createHash(password);
    const created_user = await db.insertUser(username,email,hashedPassword,role);
    const token = JWT.generateAccessToken(created_user.username, created_user.id, created_user.role);

    return { token };
  }
}

export default new AuthService();
