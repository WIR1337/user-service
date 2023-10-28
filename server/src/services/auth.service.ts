import bcrypt from "bcryptjs";
import db from "../database/queries/admin.queries.js";
import { generateAccessToken } from "../middleware/auth.js";

class AuthService {
  async login(username: string, password: string) {
    const [user] = await db.findUserByName(username);
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const pass = await db.getHashedPassword(username);
    const validPassword = bcrypt.compareSync(password, pass[0].password);

    if (!validPassword) {
      throw new Error("Incorrect password");
    }

    const token = generateAccessToken(username, user.id, user.role);
    
    return { token };
  }
  async registration(username: string, email: string, password: string) {
    const rows = await db.findUserByName(username);
    if (rows[0]) {
      throw new Error("User already exist");
    }
    // create separate functin ?
    var salt = bcrypt.genSaltSync(8);
    var hashPassword = bcrypt.hashSync(password, salt);

    const role = "admin";

    const [user] = await db.createUser(username, email, hashPassword, role);
    const token = generateAccessToken(username, user.id, role);

    return {
      message: "User has been successfully registered",
      token,
      user,
    };
  }
}

export default new AuthService();
