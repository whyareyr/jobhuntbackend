import { Router } from "express";
const router = Router();
import { getAllJobs, getJobById } from "../controllers/jobController.js";

router.get("/", getAllJobs);
router.get("/:id", getJobById);

export default router;
