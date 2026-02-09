import Company from "../models/Company.js";

// Create a company
export const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get company by ID
export const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.json(company);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
