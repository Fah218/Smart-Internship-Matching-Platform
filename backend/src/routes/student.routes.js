import express from "express";
import {
  createStudent,
  getStudentMatches,
  getStudent,
  updateStudentProfile
} from "../controllers/student.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/:id", getStudent);
router.get("/:id/matches", getStudentMatches);
router.put("/:id", upload.single("resume"), updateStudentProfile);


export default router;
