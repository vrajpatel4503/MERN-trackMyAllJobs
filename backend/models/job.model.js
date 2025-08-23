import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ensure job is always linked to a user
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyWebsite: {
      type: String,
      trim: true,
    },

    hrEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    hrPhoneNumber: {
      type: String,
      trim: true,
    },

    positionApplied: {
      type: String,
      required: true,
      trim: true,
    },

    companyCity: {
      type: String,
      trim: true,
    },

    appliedDate: {
      type: Date,
      default: Date.now,
      required: true
    },

    status: {
      type: String,
      enum: ["apply_by_email", "apply_by_onwebsite", "interview", "rejected", "offer", "save_later"],
      default: "applied",
      required : true
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
