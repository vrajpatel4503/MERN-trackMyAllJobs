import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../../store/authSlice";
import { showErrorToast, showSuccessToast } from "../../util/ToastIfyUtils";
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const API_URl = import.meta.env.VITE_API_URL || "/api"

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_URl}/api/v1/user/logout`, {
        withCredentials: true,
      });

      dispatch(authActions.logout());
      showSuccessToast(res.data.message || "Logout successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      showErrorToast(error.response?.data?.message || "Failed to logout");
    }
  };

  const handleLogoClick = () => {
    navigate(isLoggedIn ? "/home" : "/");
  };

  return (
    <div className="bg-white shadow-md px-4 md:px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <h1
        className="text-lg md:text-2xl font-bold text-blue-600 cursor-pointer tracking-wide"
        onClick={handleLogoClick}
      >
        TrackMyAllJobs
      </h1>

      {/* Center - Home (visible only when logged in & on md screens and above) */}
      {isLoggedIn && (
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/home"
            className="text-gray-700 font-medium text-lg hover:text-blue-600 transition duration-300"
          >
            Home
          </NavLink>
        </div>
      )}

      {/* Hamburger Menu Icon (Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoCloseSharp size={28} /> : <MdOutlineMenu size={28} />}
        </button>
      </div>

      {/* Right Side Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-3">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/profile"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-md transition duration-200"
            >
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
            >
              Login
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 z-50 bg-white shadow-lg rounded-md w-48 p-4 flex flex-col space-y-3 md:hidden">
          {isLoggedIn && (
            <NavLink
              to="/home"
              className="text-gray-700 font-medium hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          )}

          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                className="text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-500 font-medium hover:text-red-700 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="text-blue-500 font-medium hover:text-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-green-500 font-medium hover:text-green-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
