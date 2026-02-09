import Student from "../models/Student.js";
import Company from "../models/Company.js";

// Student Login
export const loginStudent = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(401).json({ message: "Invalid credentials. Please check your email or sign up first." });
        }

        res.json({
            success: true,
            user: {
                id: student._id,
                name: student.name,
                email: student.email,
                role: "student"
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Company Login
export const loginCompany = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const company = await Company.findOne({ email });

        if (!company) {
            return res.status(401).json({ message: "Invalid credentials. Please check your email or sign up first." });
        }

        res.json({
            success: true,
            user: {
                id: company._id,
                companyName: company.companyName,
                email: company.email,
                role: "company"
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
