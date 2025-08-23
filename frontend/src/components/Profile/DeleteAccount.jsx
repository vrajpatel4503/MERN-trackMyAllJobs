import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../util/ToastIfyUtils";
import { authActions } from "../../store/authSlice.js";

const API_URl = import.meta.env.VITE_API_URL;

const DeleteAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   handle delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${API_URl}/user/delete-user-account`,
        {
          withCredentials: true,
        }
      );

      showSuccessToast(res.data.message || "Account deleted successfully");

      dispatch(authActions.logout());
      localStorage.clear();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to Delete account"
      );
    }
  };

  return (
    <>
      <button
        className="border py-2 px-4 rounded-md bg-red-400 text-white hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete Account
      </button>
    </>
  );
};

export default DeleteAccount;
