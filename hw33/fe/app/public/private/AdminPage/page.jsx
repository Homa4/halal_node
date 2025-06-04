"use client";
import React, { useEffect, useState, useCallback } from "react";
import "./AdminPage.css";
import Header from "app/components/Header/Header";

export default function AdminPage() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    salary: "",
    email: "",
    password: "",
    role: "worker",
  });

  const [deleteEmail, setDeleteEmail] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [findError, setFindError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const fetchAdmin = async () => {
    try {
      const adminData = sessionStorage.getItem("worker");
      if (!adminData) {
        showMessage("error", "No admin session found");
        return;
      }

      const parsedAdmin = JSON.parse(adminData);

      const res = await fetch("http://localhost:8080/private/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(parsedAdmin),
      });

      if (res.ok) {
        const data = await res.json();
        setAdminInfo({ name: data.name, email: data.email });
      } else {
        const errorData = await res.json().catch(() => ({}));
        showMessage("error", errorData.message || "Failed to fetch admin info");
      }
    } catch (err) {
      console.error("Error fetching admin info", err);
      showMessage("error", "Error loading admin information");
    }
  };

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/private/getList", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setWorkers(data);
      } else {
        showMessage("error", "Failed to fetch workers");
      }
    } catch (err) {
      console.error("Error fetching workers", err);
      showMessage("error", "Error loading workers");
    } finally {
      setLoading(false);
    }
  };

  const addWorker = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("formData front:\n", formData);
      console.log("Role being sent:", formData.role);

      const res = await fetch("http://localhost:8080/private/addWorker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          role: formData.role || "worker",
        }),
      });

      if (res.ok) {
        setFormData({
          name: "",
          age: "",
          position: "",
          salary: "",
          email: "",
          password: "",
          role: "worker",
        });
        await fetchWorkers();
        showMessage("success", "Worker added successfully!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        showMessage("error", errorData.message || "Failed to add worker");
      }
    } catch (err) {
      console.error("Error adding worker", err);
      showMessage("error", "Error adding worker");
    } finally {
      setLoading(false);
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const searchWorker = async (emailValue = deleteEmail) => {
    if (emailValue.trim() === "") {
      setSelectedWorker(null);
      setFindError("");
      return;
    }

    try {
      setSearchLoading(true);
      const res = await fetch("http://localhost:8080/private/findWorker", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue }),
      });

      if (res.ok) {
        const data = await res.json();
        setSelectedWorker(data);
        setFindError("");
      } else if (res.status === 404) {
        setSelectedWorker(null);
        setFindError("Worker not found");
      } else {
        setSelectedWorker(null);
        setFindError("Error fetching worker");
      }
    } catch (err) {
      console.error("Error finding worker", err);
      setSelectedWorker(null);
      setFindError("Error fetching worker");
    } finally {
      setSearchLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(searchWorker, 500), []);

  const handleDeleteEmailChange = (e) => {
    const emailValue = e.target.value;
    setDeleteEmail(emailValue);
    setSelectedWorker(null);
    setFindError("");
    debouncedSearch(emailValue);
  };

  const deleteWorker = async () => {
    if (!selectedWorker) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedWorker.name} (${selectedWorker.email})?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/private/deleteWorker", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: deleteEmail }),
      });

      if (res.ok) {
        setDeleteEmail("");
        setSelectedWorker(null);
        setFindError("");
        await fetchWorkers();
        showMessage("success", "Worker deleted successfully!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        showMessage("error", errorData.message || "Failed to delete worker");
      }
    } catch (err) {
      console.error("Error deleting worker", err);
      showMessage("error", "Error deleting worker");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchWorkers();
  }, []);

  return (
    <div className="admin-page">
      <Header showLogin={false} />

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {adminInfo && (
        <div className="admin-info-box">
          <h2>Welcome, {adminInfo.name}</h2>
          <p>Email: {adminInfo.email}</p>
        </div>
      )}

      <h1 className="admin-title">Admin Panel</h1>

      <form onSubmit={addWorker} className="add-user-form">
        <h2>Add New Worker</h2>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />
        <input
          placeholder="Age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
          disabled={loading}
        />
        <input
          placeholder="Position"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
          required
          disabled={loading}
        />
        <input
          placeholder="Salary"
          type="number"
          min="0"
          step="0.01"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
          disabled={loading}
        />
        <input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={loading}
        />
        <input
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          disabled={loading}
        />
        <select
          value={formData.role}
          onChange={(e) => {
            console.log("Role changed to:", e.target.value);
            setFormData({ ...formData, role: e.target.value });
          }}
          disabled={loading}
        >
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Worker"}
        </button>
      </form>

      <div className="delete-form">
        <h2>Find & Delete Worker by Email</h2>
        <div className="delete-input-wrapper">
          <input
            placeholder="Enter email to find"
            type="email"
            value={deleteEmail}
            onChange={handleDeleteEmailChange}
            className="delete-input"
            disabled={loading}
          />
          <button
            className="delete-button"
            onClick={deleteWorker}
            disabled={!selectedWorker || loading}
            title={
              selectedWorker ? "Delete this worker" : "First find a worker"
            }
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

        {searchLoading && <p className="loading-text">Searching...</p>}

        {selectedWorker && (
          <div className="found-worker-card">
            <h3>Found Worker:</h3>
            <ul>
              <li>
                <strong>Name:</strong> {selectedWorker.name}
              </li>
              <li>
                <strong>Age:</strong> {selectedWorker.age}
              </li>
              <li>
                <strong>Position:</strong> {selectedWorker.position}
              </li>
              <li>
                <strong>Salary:</strong> ${selectedWorker.salary}
              </li>
              <li>
                <strong>Email:</strong> {selectedWorker.email}
              </li>
              <li>
                <strong>Role:</strong> {selectedWorker.role}
              </li>
            </ul>
          </div>
        )}

        {findError && <p className="error-text">{findError}</p>}
      </div>

      <div className="user-list">
        <h2>All Workers ({workers.length})</h2>
        {loading ? (
          <p>Loading workers...</p>
        ) : (
          <ul>
            {workers.map((w) => (
              <li key={w.email}>
                <span>
                  {w.name} ({w.email}) - {w.position}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
