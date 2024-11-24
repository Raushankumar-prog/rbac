"use client";

import { useState, useEffect } from "react";

interface Role {
  id: string;
  name: string;
}

const Manager = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<string>("");
  const [editRole, setEditRole] = useState<Role>({ id: "", name: "" });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/roles");
        const data = await res.json();
        if (data.success) {
          setRoles(data.roles);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Create a new role
  const addRole = async () => {
    if (!newRole.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setRoles([...roles, data.role]);
        setNewRole("");
      }
    } catch (error) {
      console.error("Error adding role:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update a role
  const updateRole = async () => {
    if (!editRole.name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/roles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRole),
      });
      const data = await res.json();
      if (data.success) {
        setRoles(
          roles.map((role) =>
            role.id === data.role.id ? data.role : role
          )
        );
        setEditRole({ id: "", name: "" });
      }
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a role
  const deleteRole = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/roles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setRoles(roles.filter((role) => role.id !== id));
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Roles Manager</h1>

      {/* Add Role */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="New role name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={addRole}
          className="bg-blue-500 text-white px-4 py-1"
          disabled={loading}
        >
          Add
        </button>
      </div>

      {/* Roles List */}
      <h2 className="text-xl font-semibold mb-4">Roles</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id} className="mb-2">
            {editRole.id === role.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editRole.name}
                  onChange={(e) =>
                    setEditRole({ ...editRole, name: e.target.value })
                  }
                  className="border px-2 py-1 mr-2"
                />
                <button
                  onClick={updateRole}
                  className="bg-green-500 text-white px-4 py-1 mr-2"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditRole({ id: "", name: "" })}
                  className="bg-gray-500 text-white px-4 py-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="mr-4">{role.name}</span>
                <button
                  onClick={() => setEditRole(role)}
                  className="bg-yellow-500 text-white px-4 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="bg-red-500 text-white px-4 py-1"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manager;
