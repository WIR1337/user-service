import db from "../database/queries.js";
import crypto from "../utils/bcrypt.js";
import JWT from '../utils/jwt.js';

class AuthService {
  async login(username: string, password: string) {
    const user = await db.selectUserByName(username);

    if (!user) {
      throw new Error("No users found");
    }

    const hashed = await db.selectHashedPassword(username);
    const validPassword = crypto.comparePasswords(password, hashed.password);

    if (!validPassword) {
      throw new Error("Incorrect password");
    }

    const token = JWT.generateAccessToken(username, user.id, user.role);

    return { token };
  }
  async registration(username: string, email: string, password: string) {
    const user = await db.selectUserByName(username);
    if (user) {
      throw new Error("User already exist");
    }

    const hashedPassword = crypto.createHash(password);

    const role = "admin";

    const created_user = await db.insertUser(
      username,
      email,
      hashedPassword,
      role
    );
    const token = JWT.generateAccessToken(created_user.username, created_user.id, created_user.role);

    return { token };
  }
}

export default new AuthService();
