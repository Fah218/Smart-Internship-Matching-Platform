import express from "express";
import { loginStudent, loginCompany } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login/student", loginStudent);
router.post("/login/company", loginCompany);

export default router;
