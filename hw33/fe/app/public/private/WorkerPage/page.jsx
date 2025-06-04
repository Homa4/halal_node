"use client";
import { useEffect, useState } from "react";
import React from "react";
import "./WorkerPage.css";
import Header from "app/components/Header/Header";

export default function WorkerInfo() {
  const [worker, setWorker] = useState(null);
  const workerInfo = sessionStorage.getItem("worker");
  const getWorkerInfo = async () => {
    try {
      const res = await fetch("http://localhost:8080/private/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: workerInfo,
      });

      if (res.ok) {
        const data = await res.json();
        setWorker(data);
      } else {
        console.error("Unauthorized or failed request");
      }
    } catch (err) {
      console.error("Error fetching worker:", err);
    }
  };

  useEffect(() => {
    getWorkerInfo();
  }, []);

  if (!worker) return <p>Loading worker info...</p>;

  return (
    <>
      <Header showLogin={false} />
      <div className="worker-info">
        <h2>Worker Information</h2>
        <ul className="worker-details">
          <li>
            <strong>Name:</strong> {worker.name}
          </li>
          <li>
            <strong>Age:</strong> {worker.age}
          </li>
          <li>
            <strong>Position:</strong> {worker.position}
          </li>
          <li>
            <strong>Salary:</strong> ${worker.salary}
          </li>
          <li>
            <strong>Email:</strong> {worker.email}
          </li>
          <li>
            <strong>Password:</strong> {worker.password}
          </li>
          <li>
            <strong>Role:</strong> {worker.role}
          </li>
        </ul>
      </div>
    </>
  );
}
