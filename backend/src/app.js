import express from "express";
import cors from "cors";

import studentRoutes from "./routes/student.routes.js";
import jobRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

app.use(cors()); // Allow all origins for dev
app.use(express.json());

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Smart Internship Matching Backend is running 🚀");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);

// Serve uploads
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Navigate up from src to root
const rootDir = path.join(__dirname, "..");
app.use("/uploads", express.static(path.join(rootDir, "uploads")));

export default app;
