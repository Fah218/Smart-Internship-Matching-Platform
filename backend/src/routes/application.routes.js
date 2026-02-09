import express from "express";
import { applyForJob, getStudentApplications, getCompanyApplications } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/", applyForJob); // POST /api/applications with { studentId, jobId }
router.get("/student/:studentId", getStudentApplications);
router.get("/company/:companyName", getCompanyApplications);

export default router;
