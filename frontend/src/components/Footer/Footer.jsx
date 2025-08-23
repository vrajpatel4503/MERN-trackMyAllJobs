import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="w-full border py-7 text-center bg-white">
      <p className="text-lg md:text-3xl font-semibold mb-2">
        Made By Vraj Patel
      </p>

      <div className="flex justify-center items-center gap-6 my-4">
        {/* Instagram */}
        <a
          href="https://instagram.com/vrajpatel_453"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-pink-500 text-2xl"
        >
          <FaInstagram />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vraj-patel-08629a24b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-700 text-2xl"
        >
          <FaLinkedin />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/vrajpatel4503"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black text-2xl"
        >
          <FaGithub />
        </a>

        {/* Mail */}
        <a
          href="mailto:vrajpatel40503@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black text-2xl"
        >
          <IoMdMail />
        </a>
      </div>

      <p className="text-sm md:text-base text-gray-600">
        &copy; 2025 <span className="font-semibold">TrackMyAllJobs</span>. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
