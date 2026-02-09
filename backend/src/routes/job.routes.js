import express from "express";
import {
  getJobs,
  createJob,
  getJobMatches
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", createJob);
router.get("/:id/matches", getJobMatches);

export default router;
