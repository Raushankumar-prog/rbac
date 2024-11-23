import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-200 h-screen w-64 p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul>
        <li>Teams</li>
        <li>Admins</li>
        <li>Managers</li>
        <li>Resources</li>
      </ul>
    </div>
  );
};

export default Sidebar;
