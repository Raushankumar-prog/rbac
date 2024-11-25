"use client"; 

import React, { useState } from "react";
import Link from "next/link";
import {  FaUserShield, FaTasks,FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${isOpen ? "w-64" : "w-16"} transition-all duration-300`}>
     
      <div className="fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 shadow-lg flex flex-col">
        <button
          className="p-2 mb-4 bg-gray-700 rounded focus:outline-none"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
        <ul className="space-y-4">
         
          <li>
            <Link
              href="/admins"
              className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded transition-colors"
            >
              <FaUserShield className="text-xl" />
              {isOpen && <span className="text-lg">Admins</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/managers"
              className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded transition-colors"
            >
              <FaTasks className="text-xl" />
              {isOpen && <span className="text-lg">Managers</span>}
            </Link>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
