import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    skills: {
      type: [String],
      default: []
    },

    preferredLocation: {
      type: String,
      default: ""
    },

    domain: {
      type: String,
      default: ""
    },

    isFirstTimeApplicant: {
      type: Boolean,
      default: true
    },

    githubLink: {
      type: String,
      default: ""
    },

    resume: {
      type: String, // Store file path
      default: ""
    }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
