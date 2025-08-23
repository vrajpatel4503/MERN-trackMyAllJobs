import React, { useState } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../util/ToastIfyUtils.jsx";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";

const API_URl = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  // useState
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    avatar: null,
    userName: "",
  });

  const [loading, setLoading] = useState(false);

  // handle text field Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle avatar change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSubmit = new FormData();

      ["fullName", "userName", "email", "password", "phoneNumber"].forEach(
        (field) => {
          formDataToSubmit.append(field, formData[field]);
        }
      );

      if (formData.avatar) {
        formDataToSubmit.append("avatar", formData.avatar);
      }

      const res = await axios.post(
        `${API_URl}/user/register`,
        formDataToSubmit
      );

      showSuccessToast(res.data.message || "User registered successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to register. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
          <Loader />
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div
          className={`max-w-lg mx-auto p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 transition duration-300 ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block font-medium mb-1 text-black">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-black">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1 text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-1 text-black">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
                required
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block font-medium mb-1 text-black">
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>

            {/* Already Registered */}
            <p className="text-center text-sm sm:text-base text-black">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
