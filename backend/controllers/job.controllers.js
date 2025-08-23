import Job from "../models/job.model.js";
import User from "../models/user.models.js";

// Controller: Create New Job Entry
export const createNewJobController = async (req, res) => {
  try {
    const {
      companyName,
      companyWebsite,
      hrEmail,
      hrPhoneNumber,
      positionApplied,
      companyCity,
      appliedDate,
      status,
    } = req.body;

    const { id: userId } = req.user;

    const newJob = new Job({
      user: userId,
      companyName,
      companyWebsite,
      hrEmail,
      hrPhoneNumber,
      positionApplied,
      companyCity,
      appliedDate,
      status,
    });

    const savedJob = await newJob.save();

    await User.findByIdAndUpdate(userId, {
      $push: { jobs: savedJob._id },
    });

    res.status(201).json({
      success: true,
      message: "Job added successfully.",
      job: savedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add job. Please try again later.",
    });
  }
};

// Controller: Edit Job Details
export const editJobDetailsController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { id: userId } = req.user;

    const existingJob = await Job.findOne({ _id: jobId, user: userId });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Only update fields that are provided
    existingJob.companyName = req.body.companyName || existingJob.companyName;
    existingJob.companyWebsite =
      req.body.companyWebsite || existingJob.companyWebsite;
    existingJob.hrEmail = req.body.hrEmail || existingJob.hrEmail;
    existingJob.hrPhoneNumber =
      req.body.hrPhoneNumber || existingJob.hrPhoneNumber;
    existingJob.positionApplied =
      req.body.positionApplied || existingJob.positionApplied;
    existingJob.companyCity = req.body.companyCity || existingJob.companyCity;
    existingJob.appliedDate = req.body.appliedDate || existingJob.appliedDate;
    existingJob.status = req.body.status || existingJob.status;

    const updatedJob = await existingJob.save();

    return res.status(200).json({
      success: true,
      message: "Job details updated successfully.",
      job: updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update job. Please try again later.",
    });
  }
};

// Controller: Get Single Job
export const getSingleJobController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { id: userId } = req.user;

    const job = await Job.findOne({ _id: jobId, user: userId });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job details.",
    });
  }
};

// Controller: Get All Jobs
export const getAllJobController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const jobs = await Job.find({ user: userId }).sort({ appliedDate: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job entries.",
    });
  }
};

// Controller : Update staus
export const updateStatusController = async (req, res) => {
  try {
    const { id } = req.body;
    const { jobId } = req.params;
    const { status } = req.body;

    const validStatus = [
      "apply_by_email",
      "apply_by_onwebsite",
      "interview",
      "rejected",
      "offer",
      "save_later",
    ];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const job = await Job.findByIdAndUpdate(
      { _id: jobId, user: id },
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Job status updated successfully",
      job,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Status.",
    });
  }
};

// Controller: Delete Job
export const deleteJobController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { jobId } = req.params;

    const deletedJob = await Job.findOneAndDelete({ _id: jobId, user: userId });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job removed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete job. Please try again later.",
    });
  }
};

// Controller : Filter By Status
export const filterJobsByStatusController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { status } = req.query;

    // Validate status if needed (optional)
    const validStatuses = ["applied", "interview", "rejected", "offer"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job status",
      });
    }

    const filter = { user: userId };
    if (status) {
      filter.status = status;
    }

    const data = await Job.find(filter).sort({ createdAt: -1 });

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found.",
      });
    }

    return res.status(200).json({
      success: true,
      jobs: data,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to filter jobs by status",
    });
  }
};
// ------ In future ----------
// 1. getJobAnalyticsController
// 2. searchJobsController
// 3. filterJobsByStatusController
