import bcrypt from "bcryptjs";
import db from "../database/queries/admin.queries.js";
class ApiService {
  async users() {
    const response = await db.getUsers();
    return response;
  }
  async create(username:string,password:string) {
    const rows = await db.findUserByName(username)
    if (rows[0]) {
      throw new Error("User already exist");
    }

    var salt = bcrypt.genSaltSync(8);
    var hashPassword = bcrypt.hashSync(password, salt);
    
    await db.createUser(username,hashPassword);
  }
  async edit() {}
}

export default new ApiService();
