import { Pool } from "pg";
import { connectionString } from "../config/database.js";

const pool = new Pool({ connectionString });

// pool.on("connect", () => {
//   console.log("Connected to the PostgreSQL database");
// });

// If you want to verify connectivity at app start (e.g., fail fast if DB is unreachable), you could add this:
pool
  .connect()
  .then((client) => {
    console.log("Initial DB connection successful");
    client.release(); // ✅ Don't forget to release
  })
  .catch((err) => {
    console.error("Initial DB connection failed", err.stack);
    process.exit(1); // Exit app if DB is critical
  });

export default pool;
