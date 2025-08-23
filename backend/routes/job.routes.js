import express from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import { jobValidationMiddleware } from "../middleware/job.validation.js";
import {
  createNewJobController,
  deleteJobController,
  editJobDetailsController,
  filterJobsByStatusController,
  getAllJobController,
  getSingleJobController,
  updateStatusController,
} from "../controllers/job.controllers.js";

const router = express.Router();

// Routes : Create job
router.post(
  "/create-new-job",
  verifyUser,
  jobValidationMiddleware,
  createNewJobController
);

// Routes : Edit Job
router.patch("/edit-job-field/:jobId", verifyUser, editJobDetailsController);

// Routes : get single job
router.get("/get-single-job/:jobId", verifyUser, getSingleJobController);

router.patch("/update-status/:jobId", verifyUser, updateStatusController);

// Routes : Get All Job
router.get("/get-all-job", verifyUser, getAllJobController);

// Routes : FIlter job by status
router.get("/filter", verifyUser, filterJobsByStatusController);

// Routes : Delete job
router.delete("/delete-job/:jobId", verifyUser, deleteJobController);

export default router;
