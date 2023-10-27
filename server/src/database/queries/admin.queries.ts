import pool from "../index.js";

const db = {
  getAllUsers: async function () {
    const response = await pool.query("select * from users");
    return response.rows;
  },
};

export default db;
