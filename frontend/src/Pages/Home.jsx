import React, { useEffect, useState } from "react";
import JobBox from "../components/Home/JobBox.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // handle navigate
  const handleClick = () => {
    navigate("/add-new-job");
  };

  // handle loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 md:px-10 mt-10">
        <button
          className="p-2 border-blue-600 rounded-lg bg-blue-400 hover:bg-blue-600 font-medium text-white"
          onClick={handleClick}
        >
          Add New Job
        </button>

        <div className="mt-10 mb-30ub">
          {loading ? (
            <div className="flex justify-center items-center min-h-[55vh]">
              <Loader />
            </div>
          ) : (
            <JobBox />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
