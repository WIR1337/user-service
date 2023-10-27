import pkg from "pg";
import config from "./config.js";
const { Pool } = pkg;

const pool = new Pool(config);

export default pool;
