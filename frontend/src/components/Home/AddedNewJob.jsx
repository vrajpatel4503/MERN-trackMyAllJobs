import React from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../util/ToastIfyUtils";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const API_URl = import.meta.env.VITE_API_URL;

const AddedNewJob = () => {
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

  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await axios.post(
        `${API_URl}/job/create-new-job`,
        data,
        { withCredentials: true }
      );

      showSuccessToast(res.data?.message || "Job added successfully");

      setTimeout(() => {
        setLoading(false);
      }, 500);

      setData({
        companyName: "",
        companyWebsite: "",
        hrEmail: "",
        hrPhoneNumber: "",
        positionApplied: "",
        companyCity: "",
        appliedDate: "",
        status: "",
      });

      // try part end
    } catch (error) {
      setLoading(false);
      showErrorToast(error.response?.data?.message || "Failed to add new job");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="mt-5 ml-4">
        <button
          className="flex items-center gap-2 hover:text-blue-600 font-semibold text-lg px-4 py-2 rounded-md transition"
          onClick={handleNavigate}
        >
          <IoArrowBack className="text-xl" />
          Back
        </button>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 ">
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
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1 text-black">
                hr Phone number
              </label>
              <input
                type="tel"
                name="hrPhoneNumber"
                value={data.hrPhoneNumber}
                onChange={handleChange}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-1 text-black">
                Company website
              </label>
              <input
                type="text"
                name="companyWebsite"
                value={data.companyWebsite}
                onChange={handleChange}
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
                <option value="apply_by_email">Apply By Email</option>
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
              className="w-full bg-blue-300 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300"
            >
              Add new job
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddedNewJob;
