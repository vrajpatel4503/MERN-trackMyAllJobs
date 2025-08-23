import React from "react";
import { FaRocket, FaClipboardList, FaRegBookmark } from "react-icons/fa";
import { NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NoLoginHomePage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="min-h-screen w-full px-4 md:px-16 py-10 sm-mb-12 md:-mb-12 flex flex-col items-center">
      {/* Header */}
      <p className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
        <NavLink to="/">Job Application Tracker</NavLink>
      </p>

      {/* Main Heading */}
      <div className="text-center">
        <p className="text-2xl md:text-4xl font-semibold mb-1">
          Stay on top of your job search with smart tracking and effortless organization.
        </p>
        
      </div>

      {/* Features */}
      <div className="mt-10 w-full max-w-2xl space-y-6 self-start md:mx-auto md:my-auto">
        {/* Feature 1 */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm w-full">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-red-500 rounded-xl">
            <FaRocket className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">
              Fast, Convenient, and Effortless Tracking
            </p>
            <p className="text-sm text-gray-600">
              Track your job search effortlessly — fast, organized, and always in control.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-red-500 rounded-xl">
            <FaClipboardList className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">
              Organize job applications by status for a smoother job hunt
            </p>
            <p className="text-sm text-gray-600">
              Visually manage each application — from applied to interview to offer.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-red-500 rounded-xl">
            <FaRegBookmark className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">Save Jobs for Future Reference</p>
            <p className="text-sm text-gray-600">
              Save jobs for future reference and apply when the time is right — stay organized and in control.
            </p>
          </div>
        </div>
      </div>

      {/* Register Button */}
      <div className="mt-8 md:mb-10">
        <NavLink to="/register">
          <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 transition px-6 py-3 rounded-full text-lg font-semibold">
            Register – it's 100% free!
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NoLoginHomePage;
