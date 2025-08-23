import React, { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../util/ToastIfyUtils";
import DeleteAccount from "./DeleteAccount";
import Loader from "../Loader/Loader";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/user/get-user-details`,
          { withCredentials: true }
        );

        setLoading(false);
        setEmail(res.data.user.email || "");
        setPhoneNumber(res.data.user.phoneNumber || "");
      } catch (error) {
        showErrorToast(error.response?.data?.message || "Failed to load profile details.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "phoneNumber") setPhoneNumber(value);
  };

  const handleEmailSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update-email`,
        { email },
        { withCredentials: true }
      );
      setTimeout(() => {
        showSuccessToast(res.data.message);
        setLoading(false);
      }, 1000);
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to update profile"
      );
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update-phoneNumber`,
        { phoneNumber },
        { withCredentials: true }
      );
      showSuccessToast(res.data.message);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="md:border-r md:p-4 md:top-16">
        <ProfileSidebar />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">Manage Profile</h2>

        {/* Email Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="w-full md:flex-1">
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              onFocus={() => setEmail("")}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            onClick={handleEmailSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Email
          </button>
        </div>

        {/* Phone Number Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mt-10">
          <div className="w-full md:flex-1">
            <label className="block text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              onFocus={() => setPhoneNumber("")}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            onClick={handlePhoneSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Phone
          </button>
        </div>

        {/* Delete Account Section */}
        <div className="mt-16">
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
