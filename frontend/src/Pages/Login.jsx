import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../util/ToastIfyUtils.jsx";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice.js";
import Loader from "../components/Loader/Loader.jsx";

const API_URl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URl}/user/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(
        authActions.login({
          id: res.data.user._id,
          role: res.data.user.role,
        })
      );

      showSuccessToast(res.data.message || "Login successful");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="my-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Loader*/}
      {loading && (
        <div className="absolute inset-0 bg-transparent bg-opacity-70 z-10 flex justify-center items-center">
          <Loader />
        </div>
      )}

      {/* Login Form */}
      <div
        className={`w-full max-w-md p-6 rounded-xl border shadow-md transition duration-300 bg-white ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-black">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium mb-1 text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none"
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
              className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-md text-black text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
