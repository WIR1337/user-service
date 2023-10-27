import pool from "../index.js";

const db = {
  getAllUsers: async function () {
    const response = await pool.query("select * from users");
    return response.rows;
  },
  findUserByName: async function (name: string) {
    const response = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [name]
    );
    return response.rows;
  },
};

export default db;
