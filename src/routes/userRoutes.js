import { Router } from "express";
const router = Router();
import { requireAuth } from "@clerk/express";
import { getSavedJobs, getAppliedJobs } from "../controllers/userController.js";

// These routes should be protected by Clerk middleware
router.get("/saved", requireAuth, getSavedJobs);
router.get("/applied", requireAuth, getAppliedJobs);

export default router;
