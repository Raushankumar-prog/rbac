"use client";

import { useState, useEffect } from "react";

interface Permission {
  id: string;
  name: string;
}

const Admin = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState<string>("");
  const [editPermission, setEditPermission] = useState<Permission>({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await fetch("/api/permission");
        const data = await res.json();
        if (data.success) {
          setPermissions(data.permissions);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  // Create a new permission
  const addPermission = async () => {
    if (!newPermission.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/permission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newPermission }),
      });
      const data = await res.json();
      if (data.success) {
        setPermissions([...permissions, data.permission]);
        setNewPermission("");
      }
    } catch (error) {
      console.error("Error adding permission:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update a permission
  const updatePermission = async () => {
    if (!editPermission.name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/permission", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPermission),
      });
      const data = await res.json();
      if (data.success) {
        setPermissions(
          permissions.map((perm) =>
            perm.id === data.permission.id ? data.permission : perm
          )
        );
        setEditPermission({ id: "", name: "" });
      }
    } catch (error) {
      console.error("Error updating permission:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a permission
  const deletePermission = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/permission", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setPermissions(permissions.filter((perm) => perm.id !== id));
      }
    } catch (error) {
      console.error("Error deleting permission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Add Permission */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="New permission name"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={addPermission}
          className="bg-blue-500 text-white px-4 py-1"
          disabled={loading}
        >
          Add
        </button>
      </div>

      {/* Permissions List */}
      <h2 className="text-xl font-semibold mb-4">Permissions</h2>
      <ul>
        {permissions.map((permission) => (
          <li key={permission.id} className="mb-2">
            {editPermission.id === permission.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editPermission.name}
                  onChange={(e) =>
                    setEditPermission({ ...editPermission, name: e.target.value })
                  }
                  className="border px-2 py-1 mr-2"
                />
                <button
                  onClick={updatePermission}
                  className="bg-green-500 text-white px-4 py-1 mr-2"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditPermission({ id: "", name: "" })}
                  className="bg-gray-500 text-white px-4 py-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="mr-4">{permission.name}</span>
                <button
                  onClick={() => setEditPermission(permission)}
                  className="bg-yellow-500 text-white px-4 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePermission(permission.id)}
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

export default Admin;
