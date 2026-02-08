import express from "express";
import cors from "cors";

import studentRoutes from "./routes/student.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Internship Matching Backend is running 🚀");
});

app.use("/api/students", studentRoutes);
app.use("/api/jobs", jobRoutes);

export default app;
