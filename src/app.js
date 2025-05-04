// import express, { json } from "express";
// import cors from "cors";
// import { clerkMiddleware } from "@clerk/express";
// import jobRoutes from "./routes/jobRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import errorHandler from "./middleware/errorHandler.js";

// const app = express();

// app.use(cors());
// app.use(json());

// // Public routes
// app.use("/api/jobs", jobRoutes);

// // Protected routes (require Clerk auth)
// app.use("/api/users", clerkMiddleware(), userRoutes);

// // Error handler
// app.use(errorHandler);

// export default app;

import express, { json } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// Public routes
app.use("/api/jobs", jobRoutes);

// Protected routes (require Clerk auth)
app.use("/api/users", clerkMiddleware(), userRoutes);

// Error handler
app.use(errorHandler);

export default app;
