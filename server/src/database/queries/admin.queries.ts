import { QueryResult } from "pg";
import { Action, PropsToEdit } from "../../types/actions.js";
import { HashedPassword, User, role } from "../../types/user.js";
import {
  generateActionMessage,
  generateEditingQuery,
} from "../../utils/db.utils.js";
import pool from "../index.js";

const db = {
  getHashedPassword: async function (name: string) {
    const response: QueryResult<HashedPassword> = await pool.query(
      "SELECT password FROM users WHERE username = $1",
      [name]
    );
    
    return response.rows;
  },
  findUserByName: async function (name: string) {
    const response:QueryResult<User> = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [name]
    );
    return response.rows;
  },
  findUserByID: async function (id: string) {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return response.rows;
  },
  createUser: async function (
    name: string,
    email: string,
    password: string,
    role: role
  ) {
    const response = await pool.query(
      "INSERT INTO users(username, email,password, role) VALUES ($1,$2,$3,$4) RETURNING id",
      [name, email, password, role]
    );
    return response.rows;
  },
  getUsers: async function () {
    const response = await pool.query(
      "select users.id, users.username,users.email,users.password, users.role,TO_CHAR(created_at, 'HH24:MI:SS  DD.MM.YYYY') AS created_at from users ORDER BY users.id ASC"
    );
    return response.rows;
  },
  editUser: async function (
    id: string,
    name: string | undefined,
    email: string | undefined
  ) {
    const response = await pool.query(generateEditingQuery(id, name, email));
  },
  addAction: async function (
    id: string | number,
    action: Action,
    params?: PropsToEdit
  ) {
    await pool.query(
      "INSERT INTO users_actions (user_id, action_type, action_data) VALUES ($1,$2,$3)",
      [id, action, generateActionMessage(action, params)]
    );
  },
};

export default db;
