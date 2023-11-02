import db from "../database/queries.js";
import { generateAccessToken } from "../middleware/auth.js";
import crypto from "../utils/bcrypt.js";

class AuthService {
  async login(username: string, password: string) {
    const [user] = await db.findUserByName(username);
    if (!user) {
      throw new Error("User doesn't exist");
    }
    
    const [hashed] = await db.getHashedPassword(username);
    const validPassword = crypto.comparePasswords(password, hashed.password);
    
    if (!validPassword) {
      throw new Error("Incorrect password");
    }

    const token = generateAccessToken(username, user.id, user.role);

    return { token };
  }
  async registration(username: string, email: string, password: string) {
    const [user] = await db.findUserByName(username);
    if (user) {
      throw new Error("User already exist");
    }
    
    const hashedPassword = crypto.createHash(password);

    const role = "admin";

    const [props] = await db.createUser(username, email, hashedPassword, role);
    const token = generateAccessToken(username, props.id, role);

    return {
      message: "User has been successfully registered",
      token,
      user,
    };
  }
}

export default new AuthService();
