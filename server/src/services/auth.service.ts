import db from "../database/queries/admin.queries.js";
class AuthService {
  async login() {
    const rows = await db.getAllUsers();
    return rows;
  }
  async registration() {}
}

export default new AuthService();
