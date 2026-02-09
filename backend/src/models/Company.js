import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        industry: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

export default mongoose.model("Company", companySchema);
