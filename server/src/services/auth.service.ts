import db from "../database/queries.js";
import { generateAccessToken } from "../middleware/auth.js";
import crypto from "../utils/bcrypt.js";

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

    const token = generateAccessToken(username, user.id, user.role);

    return { token };
  }
  async registration(username: string, email: string, password: string) {
    const user = await db.selectUserByName(username);
    console.log({ user });
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
    const token = generateAccessToken(created_user.username, created_user.id, created_user.role);

    return { token };
  }
}

export default new AuthService();
