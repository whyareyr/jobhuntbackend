import { Router } from "express";
const router = Router();

import {
  getSavedJobs,
  getAppliedJobs,
  applyToJob,
  saveJob,
  unsaveJob,
  unapplyJob,
} from "../controllers/userController.js";

// These routes should be protected by Clerk middleware
router.get("/saved-jobs", getSavedJobs);
router.get("/applied-jobs", getAppliedJobs);
router.post("/save-job", saveJob);
router.post("/apply-job", applyToJob);
router.post("/unsave-job", unsaveJob);
router.post("/unapply-job", unapplyJob);

export default router;
