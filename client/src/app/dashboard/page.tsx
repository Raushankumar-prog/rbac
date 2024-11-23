import React from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";

const Dashboard = () => {
  const sampleData = [
    { Name: "John Doe", Role: "Manager", Email: "john@example.com" },
    { Name: "Jane Smith", Role: "Admin", Email: "jane@example.com" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Table data={sampleData} />
      </div>
    </div>
  );
};

export default Dashboard;
