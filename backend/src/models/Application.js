import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    company: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    status: {
        type: String,
        enum: ["Applied", "Viewed", "Interviewing", "Offer", "Rejected"],
        default: "Applied"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

// Create compound index to prevent duplicate applications
ApplicationSchema.index({ student: 1, job: 1 }, { unique: true });

export default mongoose.model("Application", ApplicationSchema);
