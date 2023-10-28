import db from "../database/queries/admin.queries.js";
class ApiService {
  async users() {
    const response = await db.getUsers();
    return response;
  }
  async create() {}
  async edit() {}
}

export default new ApiService();
