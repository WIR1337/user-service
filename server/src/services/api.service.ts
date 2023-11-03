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
      console.log('user if')
      throw new Error("User already exist");
    }

    const hashedPassword = crypto.createHash(password);

    console.log('before create')
    const created_user = await db.createUser(
      username,
      email,
      hashedPassword,
      "user"
    );
    console.log('before action')
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

    await db.editUser(id, username, email);

    const params = {
      username,
      email,
      prevName: user.username,
      prevEmail: user.email,
    };

    const action = await db.addAction(id, "update", params);
    return { id: action.id };
  }
}

export default new ApiService();
