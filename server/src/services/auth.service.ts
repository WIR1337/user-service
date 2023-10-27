import bcrypt from "bcryptjs";
import db from "../database/queries/admin.queries.js";
import auth from "../middleware/auth.js";

class AuthService {
  async login(username: string, password: string) {
    const rows = await db.findUserByName(username);
    if (!rows[0]) {
      throw new Error("User doesn't exist");
    }
    const pass = await db.getHashedPassword(username);

    const validPassword = bcrypt.compareSync(password, pass[0].password);

    if (!validPassword) {
      throw new Error("Incorrect password");
    }

    const token = auth.generateAccessToken(username);
    console.log({token})
    return { token };
  }
  async registration(username: string, password: string) {
    const rows = await db.findUserByName(username);
    if (rows[0]) {
      throw new Error("User already exist");
    }
    var salt = bcrypt.genSaltSync(8);
    var hashPassword = bcrypt.hashSync(password, salt);

    await db.createUser(username, hashPassword);

    return { status: true, message: "User has been successfully registered" };
  }
}

export default new AuthService();
