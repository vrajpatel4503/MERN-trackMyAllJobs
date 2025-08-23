import React, { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast } from "../../util/ToastIfyUtils";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const API_URl = import.meta.env.VITE_API_URL;

const ProfileCard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${API_URl}/user/get-user-details`,
          {
            withCredentials: true,
          }
        );
        setData(res.data.user);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setTimeout(() => {
          setLoading(false); 
          showErrorToast(
            error.response?.data?.message ||
              "Failed to fetch profile. Please try again"
          );
          navigate("/home");
        }, 3000); // Reduced delay
      }
    };

    fetchUserDetails();
  });

  // Loader while fetching
  if (loading) return <Loader />;

  // If data failed to load
  if (!data)
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg">Failed to load profile.</p>
      </div>
    );

  return (
    <div className="w-full flex justify-center items-center py-10 mt-15">
      <div className="border rounded-xl w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>

        <img
          src={data.avatar?.url || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 my-9 rounded-full mx-auto"
        />

        <div className="flex flex-col gap-4 text-lg text-center">
          <p>
            <strong>Full Name:</strong> {data.fullName}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {data.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
