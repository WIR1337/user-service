import db from "../database/queries.js";
import crypto from "../utils/bcrypt.js";
class ApiService {
  async users() {
    const users = await db.getUsers();
    return users;
  }
  async create(username: string, email: string, password: string) {
    const user = await db.findUserByName(username);
    
    if (user) {
      throw new Error("User already exist");
    }

    const hashedPassword = crypto.createHash(password);

    const created_user = await db.createUser(
      username,
      email,
      hashedPassword,
      "user"
    );

    const action = await db.addAction(created_user.id, "create");

    return { id: action.id, user_id: created_user.id };
  }
  async edit(
    id: number,
    username: string | undefined,
    email: string | undefined
  ) {
    const user = await db.findUserByID(id);
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const updatedUser = await db.editUser(id, username, email);

    const params = {
      username: updatedUser.username,
      email: updatedUser.email,
      prevName: user.username,
      prevEmail: user.email,
    };

    const action = await db.addAction(id, "update", params);
    return { id: action.id };
  }
}

export default new ApiService();
