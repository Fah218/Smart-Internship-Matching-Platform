import express from "express";
import { createCompany, getCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", createCompany);
router.get("/:id", getCompany);

export default router;
