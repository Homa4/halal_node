"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ErrorText from "./ErrorText";
import "./Login.css";
import Header from "app/components/Header/Header";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [passVisible, setVisible] = useState(false);
  const [error, setError] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Wrong credentials");
      }

      const worker = await response.json();
      console.log(worker);
      sessionStorage.setItem("worker", JSON.stringify({ email, password }));
      worker.role === "worker"
        ? router.push("/public/private/WorkerPage")
        : router.push("/public/private/AdminPage");
    } catch (err) {
      setError("Login failed. Check email or password.");
      console.error("Login error:", err);
    }
  };

  const changeVisibility = () => {
    setVisible(!passVisible);
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-form-wrapper">
        <form onSubmit={handleLogin} className="login-form" noValidate>
          <div className="input-container">
            <input
              maxLength={40}
              placeholder="Email"
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <ErrorText errText={error} />
            <span className="glyphicon glyphicon-envelope input-icon" />
          </div>

          <div className="input-container">
            <input
              maxLength={40}
              placeholder="Password"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
              type={passVisible ? "text" : "password"}
            />
            <button type="button" onClick={changeVisibility}>
              show
            </button>
            <ErrorText errText={error} />
            <span className="glyphicon glyphicon-lock input-icon" />
          </div>

          <div className="row-wrapper">
            <div className="remember-container">
              <label htmlFor="remember">
                <input
                  id="remember"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  type="checkbox"
                />
                Remember Me
              </label>
            </div>

            <div className="button-container">
              <button type="submit" className="btn-submit">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
