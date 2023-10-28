import bcrypt from "bcryptjs";
import db from "../database/queries/admin.queries.js";
class ApiService {
  async users() {
    const response = await db.getUsers();
    return response;
  }
  async create(username:string,password:string) {
    var salt = bcrypt.genSaltSync(8);
    var hashPassword = bcrypt.hashSync(password, salt);

    await db.createUser(username,hashPassword);
  }
  async edit() {}
}

export default new ApiService();
