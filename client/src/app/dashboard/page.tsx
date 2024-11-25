import React from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";

const Dashboard = () => {
  const sampleData = [
    { Name: "John Doe", Role: "Manager", Email: "john@example.com" },
    { Name: "Jane Smith", Role: "Admin", Email: "jane@example.com" },
  ];

  return (
    <div className="flex h-screen">
    
     <div className="mt-30"><Sidebar /></div> 

     
      <div className="flex-grow p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Table data={sampleData} />
      </div>
    </div>
  );
};

export default Dashboard;
