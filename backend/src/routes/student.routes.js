import express from "express";
import { updateStudentProfile } from "../controllers/student.controller.js";
import {
  createStudent,
  getStudentMatches
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/:id/matches", getStudentMatches);
router.put("/:id", updateStudentProfile);


export default router;
