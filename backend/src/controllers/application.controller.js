import Application from "../models/Application.js";
import Student from "../models/Student.js";
import Job from "../models/Job.js";

// Apply for a job
export const applyForJob = async (req, res) => {
    try {
        const { studentId, jobId } = req.body;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        // Check if already applied
        const existingApplication = await Application.findOne({ student: studentId, job: jobId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        const application = new Application({
            student: studentId,
            job: jobId,
            company: job.company || job.companyName // Handle both field names
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get applications by student
export const getStudentApplications = async (req, res) => {
    try {
        const { studentId } = req.params;
        const applications = await Application.find({ student: studentId })
            .populate("job")
            .sort("-appliedAt");
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get applications by company
export const getCompanyApplications = async (req, res) => {
    try {
        const { companyName } = req.params;
        // Search by company string match
        // But better if we stored companyEmail in Application or Job?
        // Application stores 'company' string.
        const applications = await Application.find({ company: companyName })
            .populate("student")
            .populate("job")
            .sort("-appliedAt");
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
