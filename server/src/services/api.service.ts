import bcrypt from "bcryptjs";
import db from "../database/queries/admin.queries.js";
class ApiService {
  async users() {
    const response = await db.getUsers();
    return response;
  }
  async create(username: string, email: string, password: string) {
    const rows = await db.findUserByName(username);
    if (rows[0]) {
      throw new Error("User already exist");
    }

    var salt = bcrypt.genSaltSync(8);
    var hashPassword = bcrypt.hashSync(password, salt);

    const [user] = await db.createUser(username, email, hashPassword, "user");
    await db.addAction(user.id, "create");
  }
  async edit(
    id: string,
    username: string | undefined,
    email: string | undefined
  ) {
    const [user] = await db.findUserByID(id);
    if (!user) {
      throw new Error("User doesn't exist");
    }

    await db.editUser(id, username, email);
    const params = {
      username,
      email,
      prevName: user.username,
      prevEmail: user.email
    }

    await db.addAction(id,'update', params)
  }
}

export default new ApiService();
