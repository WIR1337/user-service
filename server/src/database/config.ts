import { PoolConfig } from "pg";

import { config } from "dotenv";
config();

const dbConfig: PoolConfig = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5432,
  database: process.env.DATABASE || "postgres",
  user: process.env.USER,
};

export default dbConfig;
