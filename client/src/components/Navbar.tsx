import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">DevOps Team Manager</div>
      <ul className="flex space-x-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
