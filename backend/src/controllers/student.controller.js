import Student from "../models/Student.js";
import { matchStudentWithJobs } from "../services/matching.service.js";

// Create a student
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get matched jobs for a student
export const getStudentMatches = async (req, res) => {
  try {
    const matches = await matchStudentWithJobs(req.params.id);
    res.json(matches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
