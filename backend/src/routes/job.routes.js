import express from "express";
import {
  createJob,
  getJobMatches
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", createJob);
router.get("/:id/matches", getJobMatches);

export default router;
