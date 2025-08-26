import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../util/ToastIfyUtils";
import Loader from "../Loader/Loader";
import { IoArrowBack } from "react-icons/io5";

const API_URl = import.meta.env.VITE_API_URL || "/api"

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // useState
  const [data, setData] = useState({
    companyName: "",
    companyWebsite: "",
    hrEmail: "",
    hrPhoneNumber: "",
    positionApplied: "",
    companyCity: "",
    appliedDate: "",
    status: "applied",
  });

  const [loading, setLoading] = useState(true);

  const [backupData, setBackupData] = useState({});

  //   change data format
  const formatData = (dataString) => {
    const date = new Date(dataString);
    return date.toISOString().split("T")[0];
  };

  //   useEffect for fetch job details by jobId
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(
          `${API_URl}/api/v1/job/get-single-job/${jobId}`,

          { withCredentials: true }
        );
        const job = res.data?.job;

        setData({
          ...job,
          appliedDate: job.appliedDate ? formatData(job.appliedDate) : "",
        });

        setTimeout(() => {
          setLoading(false);
        }, 100);
        // try part end
      } catch (error) {
        setTimeout(() => {
          setLoading(true);
          showErrorToast(
            error.response?.data?.message || "Failed Please try again"
          );
          navigate(`/view-job/${jobId}`);
        }, 10000);
      }
    };
    fetchJobDetails();
  }, [jobId, navigate]);

  //   handle change for input field
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${API_URl}/api/v1/job/edit-job-field/${jobId}`,
        data,
        { withCredentials: true }
      );

      showSuccessToast(res.data?.message || "Job updated successfully");

      setTimeout(() => {
        setLoading(false);
        navigate(`/view-job/${jobId}`);
      }, 1200);

      // try part end
    } catch (error) {
      setTimeout(() => {
        setLoading(true);
        showErrorToast(error.response?.data?.message || "Failed to update job");
        navigate(`/view-job/${jobId}`);
      }, 10000);
    }
  };

  //   handle focus to clear input text when user click
  const handleFocus = (field) => {
    setBackupData((previous) => ({
      ...previous,
      [field]: data[field],
    }));

    setData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  //   handle blur if user doesn't type anything thing and click another input text
  const handleBlur = (field) => {
    if (data[field] === "") {
      setData((prev) => ({
        ...prev,
        [field]: backupData[field] || "",
      }));
    }
  };

  // handle Navigate
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="">
        <button
          className="flex mt-5 hover:text-blue-600 -mb-10 ml-6 justify-center items-center font-semibold text-xl px-3 py-2 rounded-lg"
          onClick={handleNavigate}
        >
          <span className="">
            <IoArrowBack className="text-xl mr-2" />
          </span>
          Back{" "}
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10 ">
          <div className="max-w-lg mx-auto  p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
              Add new job
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={handleChange}
                  onClick={() => handleFocus("companyName")}
                  onBlur={() => handleBlur("companyName")}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* hr Email */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  Hr Email
                </label>
                <input
                  type="email"
                  name="hrEmail"
                  value={data.hrEmail}
                  onChange={handleChange}
                  onClick={() => handleFocus("hrEmail")}
                  onBlur={() => handleBlur("hrEmail")}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  hr Phone number
                </label>
                <input
                  type="tel"
                  name="hrPhoneNumber"
                  value={data.hrPhoneNumber}
                  onChange={handleChange}
                  onClick={() => handleFocus("hrPhoneNumber")}
                  onBlur={() => handleBlur("hrPhoneNumber")}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>

              {/* PCompany Website */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  Company website
                </label>
                <input
                  type="text"
                  name="companyWebsite"
                  value={data.companyWebsite}
                  onChange={handleChange}
                  onClick={() => handleFocus("companyWebsite")}
                  onBlur={() => handleBlur("companyWebsite")}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>

              {/* Postion applied */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  Postion applied
                </label>
                <input
                  type="text"
                  name="positionApplied"
                  value={data.positionApplied}
                  onChange={handleChange}
                  onClick={() => handleFocus("positionApplied")}
                  onBlur={() => handleBlur("positionApplied")}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Company city */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  Company City
                </label>
                <input
                  type="text"
                  name="companyCity"
                  value={data.companyCity}
                  onChange={handleChange}
                  onClick={() => handleFocus("companyCity")}
                  onBlur={() => handleBlur("companyCity")}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              {/* Applied date */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  Applied data
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={data.appliedDate}
                  onChange={handleChange}
                  onClick={() => handleFocus("appliedDate")}
                  onBlur={() => handleBlur("appliedDate")}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                />
              </div>
              {/* Status */}
              <div>
                <label className="block font-medium mb-1 text-black">
                  Status
                </label>
                <select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                >
                  <option value="apply_by_email">Apply by Email</option>
                  <option value="apply_by_onwebsite">Apply on Website</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                  <option value="save_later">Save Later</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-200 text-white py-2 rounded-md hover:bg-blue-400 transition duration-300"
              >
                Edit job
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditJob;
