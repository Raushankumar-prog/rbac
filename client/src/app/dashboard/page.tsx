"use client";

interface Role {
  name: string;
}

interface User {
  name: string;
  email: string;
  role?: Role;
}

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";

const Dashboard = () => {
  const sampleData = [
    { Name: "John Doe", Role: "JUNIOR AWS DEV", Email: "john@example.com" },
    { Name: "Jane Smith", Role: "SENIOR DOCKER DEV", Email: "jane@example.com" },
    { Name: "Alice Brown", Role: "JUNIOR DOCKER DEV", Email: "alice@example.com" },
    { Name: "Bob Taylor", Role: "SENIOR IAC DEV", Email: "bob@example.com" },
    { Name: "Clara Wilson", Role: "JUNIOR IAC DEV", Email: "clara@example.com" },
    { Name: "Ethan Davis", Role: "SENIOR VERSION DEV", Email: "ethan@example.com" },
    { Name: "Grace Lee", Role: "JUNIOR VERSION DEV", Email: "grace@example.com" },
    { Name: "Henry White", Role: "SENIOR KUBERNETES DEV", Email: "henry@example.com" },
    { Name: "Isla Black", Role: "JUNIOR KUBERNETES", Email: "isla@example.com" },
    { Name: "Jack King", Role: "SENIOR CI/CD DEV", Email: "jack@example.com" },
  ];

  const [fetchedData, setFetchedData] = useState<
    { Name: string; Role: string; Email: string }[]
  >([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (data.success) {
          const users = data.users.map((user: User) => ({
            Name: user.name,
            Role: user.role?.name || "No Role Assigned",
            Email: user.email,
          }));
          setFetchedData(users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-6 bg-black">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Sample Data */}
        <div className="mb-10 bg-black">
          <h2 className="text-xl font-semibold mb-4">Sample Data</h2>
          <Table   data={sampleData} />
        </div>

        {/* Fetched Data */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Fetched Data</h2>
          {fetchedData.length > 0 ? (
            <Table data={fetchedData} />
          ) : (
            <p>Loading fetched data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
