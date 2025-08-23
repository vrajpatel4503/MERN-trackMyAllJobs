import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../util/ToastIfyUtils";
import Loader from "../Loader/Loader";
import { IoArrowBack } from "react-icons/io5";

const API_URl = import.meta.env.VITE_API_URL || "/api"

const ViewJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusCode = {
    apply_by_email: "bg-yellow-500",
    apply_by_onwebsite: "bg-yellow-500",
    interview: "bg-blue-500",
    rejected: "bg-red-600",
    offer: "bg-green-600",
    save_later: "bg-gray-500",
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${API_URl}/api/v1/job/get-single-job/${jobId}`,
          { withCredentials: true }
        );

        setJob(res.data.job);
        setTimeout(() => setLoading(false), 200);
      } catch (error) {
        setLoading(false);
        showErrorToast(
          error.response?.data?.message || "Failed to fetch the job"
        );
      }
    };

    fetchJob();
  }, [jobId]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${API_URl}/api/v1/job/delete-job/${jobId}`,
        { withCredentials: true }
      );
      showSuccessToast(res.data.message || "Job successfully deleted");
      navigate("/home");
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to delete job");
    }
  };

  const handleNavigate = () => navigate(-1);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <Loader />
      </div>
    );

  if (!job)
    return (
      <p className="p-6 text-center text-lg text-gray-600">
        Loading job details...
      </p>
    );

  return (
    <>
      {/* Back Button */}
      <div className="px-4 pt-6 sm:px-6">
        <button
          className="flex items-center gap-2 hover:text-blue-900 font-semibold text-base"
          onClick={handleNavigate}
        >
          <IoArrowBack className="text-xl" />
          Back
        </button>
      </div>

      {/* Job Details Card */}
      <div className="max-w-2xl mx-4 sm:mx-auto my-10 bg-white p-6 sm:p-8 rounded-xl shadow-md border">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800">
          Job Application Details
        </h1>

        <div className="divide-y divide-gray-300 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2">
            <p className="text-gray-600 font-bold">Position Applied</p>
            <p className="text-gray-900 text-right">{job.positionApplied}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2">
            <p className="text-gray-600 font-bold">Company Name</p>
            <p className="text-gray-900 text-right">{job.companyName}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2">
            <p className="text-gray-600 font-bold">HR Email</p>
            <p className="text-gray-900 text-right">{job.hrEmail || "--"}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2">
            <p className="text-gray-600 font-bold">Company City</p>
            <p className="text-gray-900 text-right">
              {job.companyCity || "--"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2">
            <p className="text-gray-600 font-bold">Applied Date</p>
            <p className="text-gray-900 text-right">
              {new Date(job.appliedDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2">
            <p className="text-gray-600 font-bold">Company Phone Number</p>
            <p className="text-gray-900 text-right">
              {job.hrPhoneNumber || "--"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2">
            <p className="text-gray-600 font-bold">Company Website</p>
            <p className="text-gray-900 text-right break-all">
              {job.companyWebsite || "--"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-4 gap-2 items-center">
            <p className="text-gray-600 font-bold">Application Status</p>
            <span
              className={`px-4 py-1 text-sm rounded-full text-white font-medium capitalize ${
                statusCode[job.status] || "bg-gray-500"
              }`}
            >
              {job.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(`/edit-job/${jobId}`)}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Edit Job
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
            onClick={handleDelete}
          >
            Delete Job
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewJob;
