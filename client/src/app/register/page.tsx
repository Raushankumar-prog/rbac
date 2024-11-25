"use client";

import React, { useState, useEffect } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "", 
  });

  const [roles, setRoles] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          roleId: formData.roleId,
      
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`User registered successfully! ID: ${data.user.id}`);
        setFormData({ name: "", email: "", password: "", roleId: roles[0] || "" });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Failed to register user"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/roles");
        if (!res.ok) throw new Error("Failed to fetch roles");
        const data = await res.json();
        if (data.success) {
          setRoles(data.roles.map((role: {name: string }) => role.name));
          setFormData((prev) => ({ ...prev, roleId: data.roles[0]?.name || "" }));
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form
        className="w-1/3 bg-white p-6 shadow-lg rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roleId" className="block text-gray-700">
            Role
          </label>
          <select
            id="roleId"
            name="roleId"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.roleId}
            onChange={handleChange}
          >
            {roles.map((roleId) => (
              <option key={roleId} value={roleId}>
                {roleId}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-sm text-gray-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
