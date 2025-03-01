import "./Register.css";

import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Register Component.
 */
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Reset form
    setError("");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>

        {error ? <div className="error-message">{error}</div> : null}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              onChange={e => {
                setName(e.target.value);
              }}
              placeholder="Enter your full name"
              required
              type="text"
              value={name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={e => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              required
              type="email"
              value={email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              placeholder="Create a password"
              required
              type="password"
              value={password}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm your password"
              required
              type="password"
              value={confirmPassword}
            />
          </div>

          <button className="register-button" type="submit">
            Sign Up
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
