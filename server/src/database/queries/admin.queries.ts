import { QueryResult } from "pg";
import { Action, ActionID, PropsToEdit } from "../../types/actions.js";
import { HashedPassword, User, UserID, role } from "../../types/user.js";
import {
  generateActionMessage,
  generateEditingQuery,
} from "../../utils/db.utils.js";
import pool from "../index.js";

class DB {
  async getHashedPassword(name: string) {
    const response: QueryResult<HashedPassword> = await pool.query(
      "SELECT password FROM users WHERE username = $1",
      [name]
    );

    return response.rows;
  }
  async findUserByName(name: string) {
    const response: QueryResult<User> = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [name]
    );
    return response.rows;
  }
  async findUserByID(id: string) {
    const response: QueryResult<User> = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return response.rows;
  }
  async createUser(name: string, email: string, password: string, role: role) {
    const response: QueryResult<UserID> = await pool.query(
      "INSERT INTO users(username, email,password, role) VALUES ($1,$2,$3,$4) RETURNING id",
      [name, email, password, role]
    );
    return response.rows;
  }
  async getUsers() {
    const response: QueryResult<User> = await pool.query(
      "select users.id, users.username,users.email,users.password, users.role,TO_CHAR(created_at, 'HH24:MI:SS  DD.MM.YYYY') AS created_at from users ORDER BY users.id ASC"
    );
    return response.rows;
  }
  async editUser(
    id: string,
    name: string | undefined,
    email: string | undefined
  ) {
    const response = await pool.query(generateEditingQuery(id, name, email));
  }
  async addAction(id: string | number, action: Action, params?: PropsToEdit) {
    const response: QueryResult<ActionID> = await pool.query(
      "INSERT INTO users_actions (user_id, action_type, action_data) VALUES ($1,$2,$3) RETURNING id",
      [id, action, generateActionMessage(action, params)]
    );

    return response.rows;
  }
}

export default new DB();
