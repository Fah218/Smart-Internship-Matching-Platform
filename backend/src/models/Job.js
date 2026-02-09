import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    companyName: {
      type: String,
      default: function () { return this.company; }
    },

    companyEmail: {
      type: String,
      default: ""
    },

    skillsRequired: {
      type: [String],
      required: true
    },

    location: {
      type: String,
      required: true
    },

    isRemote: {
      type: Boolean,
      default: false
    },

    domain: {
      type: String,
      required: true
    },

    source: {
      type: String,
      default: "company_direct" // future-proof
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
