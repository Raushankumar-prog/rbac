"use client";

import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Viewer",
  });

  const [message, setMessage] = useState<string | null>(null);

  const roles = ["Admin", "Manager", "Viewer"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          roleId: formData.role, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`User registered successfully! ID: ${data.user.id}`);
        setFormData({ name: "", email: "", password: "", role: "Viewer" });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Failed to register user"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

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
          <label htmlFor="role" className="block text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
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
