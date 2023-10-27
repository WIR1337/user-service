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

    return rows;
  }
}

export default new AuthService();
