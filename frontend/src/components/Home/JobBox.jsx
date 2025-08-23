import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewJob from "../Job/ViewJob";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { showErrorToast } from "../../util/ToastIfyUtils";

const JobBox = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/job/get-all-job",
        {
          withCredentials: true, 
        }
      );
      setJobs(res.data.jobs || []);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to fetch job")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="p-4"></p>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-md border mt-4">
      <table className="min-w-full table-auto border-collapse bg-white">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Company Name</th>
            <th className="px-4 py-2 text-left">HR Email</th>
            <th className="px-4 py-2 text-left">Position Applied</th>
            <th className="px-4 py-2 text-left">Applied Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">More Details</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                No job entries found.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job._id} className="border-t">
                <td className="px-4 py-2">{job.companyName}</td>
                <td className="px-4 py-2">{job.hrEmail || "--"}</td>
                <td className="px-4 py-2">{job.positionApplied}</td>
                <td className="px-4 py-2">
                  {new Date(job.appliedDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2"> {job.status.charAt(0).toUpperCase() + job.status.slice(1)}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/view-job/${job._id}`)}
                  >
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobBox;
