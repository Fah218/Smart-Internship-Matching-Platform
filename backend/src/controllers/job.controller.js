import Job from "../models/Job.js";
import { matchJobWithStudents } from "../services/matching.service.js";

// Get all jobs or filter by company email
export const getJobs = async (req, res) => {
  try {
    const { companyEmail } = req.query;
    const filter = companyEmail ? { companyEmail } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
