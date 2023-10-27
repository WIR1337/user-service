import bcrypt from "bcryptjs";
import db from "../database/queries/admin.queries.js";
class AuthService {
  async login() {
    const rows = await db.getAllUsers();
    return rows;
  }
  async registration(username: string, password: string) {
    const rows = await db.findUserByName(username);
    if (rows[0]) {
      throw new Error("User already exist");
    }
    var salt = bcrypt.genSaltSync(8);
    var hashPassword = bcrypt.hashSync(password, salt);

    return rows;
  }
}

export default new AuthService();
