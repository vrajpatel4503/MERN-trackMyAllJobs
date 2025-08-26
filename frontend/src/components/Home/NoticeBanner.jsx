import React, { useState } from "react";
import { IoAlertCircle, IoClose } from "react-icons/io5";


const NoticeBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-3 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IoAlertCircle className="w-5 h-5 text-yellow-700" />
        <p className="text-sm md:text-base">
          ⚠️ <b>Important:</b> Please <b>do not refresh the page after login</b> — it may cause an error.  
          If it happens, click 👉{" "}
          <a
            href="https://mern-track-my-all-jobs.vercel.app/"
            target="_blank"
            className="underline font-medium text-yellow-800 hover:text-yellow-900"
          >
            TrackMyAllJobs
          </a>{" "}
          and log in again.  
          We are actively working on resolving this issue and enhancing the user experience.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-yellow-700 hover:text-yellow-900"
      >
        <IoClose  className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NoticeBanner;
