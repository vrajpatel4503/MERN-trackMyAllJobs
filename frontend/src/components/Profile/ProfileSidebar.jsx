import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoMdClose } from "react-icons/io";



const ProfileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Hamburger icon for mobile */}
      <div className="md:hidden flex justify-between items-center px-4 py-4 border-b bg-white shadow-sm">
        <h2 className="text-base font-semibold text-gray-800">Account</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl text-gray-700"
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 mx-4 my-10 border rounded-2xl p-6 shadow-sm bg-white">
        <h2 className="text-xl font-semibold text-center mb-6">Account</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/profile" className={linkClasses}>
            <FaUser className="w-5 h-5" />
            <span>My Profile</span>
          </NavLink>
          <NavLink to="/manage-profile" className={linkClasses}>
            <IoIosSettings className="w-5 h-5" />
            <span>Manage Profile</span>
          </NavLink>
        </nav>
      </div>

      {/* Slide-over sidebar for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar Panel */}
          <div className="w-64 bg-white h-full p-5 flex flex-col justify-start shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Account</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-600"
                aria-label="Close menu"
              >
                <IoMdClose />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <NavLink
                to="/profile"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="w-5 h-5" />
                <span>My Profile</span>
              </NavLink>
              <NavLink
                to="/manage-profile"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <IoIosSettings className="w-5 h-5" />
                <span>Manage Profile</span>
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSidebar;
