import { Pool } from "pg";
import { connectionString } from "../config/database.js";

const pool = new Pool({ connectionString });

pool
  .connect()
  .then((client) => {
    console.log("Initial DB connection successful");
    client.release();
  })
  .catch((err) => {
    console.error("Initial DB connection failed", err.stack);
    process.exit(1);
  });

export default pool;
