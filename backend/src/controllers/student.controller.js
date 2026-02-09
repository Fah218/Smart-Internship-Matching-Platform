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

// Update a student profile
export const updateStudentProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If file uploaded, add path
    if (req.file) {
      updateData.resume = req.file.path.replace(/\\/g, "/"); // Normalize path
    }

    // Handle skills array if it comes as string (from FormData)
    if (typeof updateData.skills === "string") {
      // If it looks like JSON array
      if (updateData.skills.startsWith("[")) {
        try {
          updateData.skills = JSON.parse(updateData.skills);
        } catch (e) {
          console.error("Skills parsing error", e);
        }
      } else {
        // Comma separated
        updateData.skills = updateData.skills.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single student by ID
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
