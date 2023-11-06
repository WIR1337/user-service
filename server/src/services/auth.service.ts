import db from "../repository/auth.queries.js";
import crypto from "../utils/bcrypt.utils..js";
import JWT from '../utils/jwt.utils.js';

class AuthService {
  async login(username: string, password: string) {
    // this is part of validation
    // const user = await db.selectUserByName(username);
    // if (!user) {
      // throw new Error("No users found");
    // }

    // const user = await db.selectHashedPassword(username);
    const user = await db.selectUserByName(username);
    const validPassword = crypto.comparePasswords(password, user.password);

    if (!validPassword) {
      // i need a class for creating Errors
      throw new Error("Incorrect password");
    }

    const token = JWT.generateAccessToken(username, user.id, user.role);

    return { token };
  }
  async registration(username: string, email: string, password: string) {
    // this is part of validation
    // const user = await db.selectUserByName(username);
    // if (user) {
      // throw new Error("User already exist");
    // }

    const hashedPassword = crypto.createHash(password);
    const role = "admin";

    const created_user = await db.insertUser(username,email,hashedPassword,role);
    const token = JWT.generateAccessToken(created_user.username, created_user.id, created_user.role);

    return { token };
  }
}

export default new AuthService();
