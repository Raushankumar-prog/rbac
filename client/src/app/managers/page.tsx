"use client";

import { useState, useEffect } from "react";

interface Role {
  id: string;
  name: string;
  permissionName: string; 
}

interface Permission {
  id: string;
  name: string;
}

const Manager = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newRole, setNewRole] = useState<string>("");
  const [newPermissionName, setNewPermissionName] = useState<string>("");
  const [editRole, setEditRole] = useState<Role>({ id: "", name: "", permissionName: "" });
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/roles");
        if (!res.ok) throw new Error("Failed to fetch roles");
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

  
  

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
         const res = await fetch('/api/permission');
       
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






  const addRole = async () => {
    if (!newRole.trim() || !newPermissionName) return;
    setLoading(true);
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newRole, permissionName: newPermissionName }),
      });
      const data = await res.json();
      if (data.success) {
        setRoles([...roles, data.role]);
        setNewRole("");
        setNewPermissionName("");
      }
    } catch (error) {
      console.error("Error adding role:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async () => {
    if (!editRole.name.trim() || !editRole.permissionName) return;
    setLoading(true);
    try {
      const res = await fetch("/api/roles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRole),
      });
      const data = await res.json();
      if (data.success) {
        setRoles(roles.map((role) => (role.id === data.role.id ? data.role : role)));
        setEditRole({ id: "", name: "", permissionName: "" });
      }
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  
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
        <select
          value={newPermissionName}
          onChange={(e) => setNewPermissionName(e.target.value)}
          className="border px-2 py-1 mr-2"
        >
          <option value="" disabled>
            Select permission
          </option>
          {permissions.map((permission) => (
            <option key={permission.id} value={permission.name}>
              {permission.name}
            </option>
          ))}
        </select>
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
                <select
                  value={editRole.permissionName}
                  onChange={(e) =>
                    setEditRole({ ...editRole, permissionName: e.target.value })
                  }
                  className="border px-2 py-1 mr-2"
                >
                  <option value="" disabled>
                    Select permission
                  </option>
                  {permissions.map((permission) => (
                    <option key={permission.id} value={permission.name}>
                      {permission.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={updateRole}
                  className="bg-green-500 text-white px-4 py-1 mr-2"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  onClick={() =>
                    setEditRole({ id: "", name: "", permissionName: "" })
                  }
                  className="bg-gray-500 text-white px-4 py-1"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="mr-4">{role.name}</span>
                <span className="mr-4">({role.permissionName})</span>
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
