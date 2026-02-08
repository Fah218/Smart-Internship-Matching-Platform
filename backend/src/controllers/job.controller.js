import Job from "../models/Job.js";
import { matchJobWithStudents } from "../services/matching.service.js";

// Create a job / internship
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get matched students for a job
export const getJobMatches = async (req, res) => {
  try {
    const matches = await matchJobWithStudents(req.params.id);
    res.json(matches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
