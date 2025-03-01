import "./Login.css";

import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Login Component.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Reset form
    setError("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        {error ? <div className="error-message">{error}</div> : null}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
              type="password"
              value={password}
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <div className="signup-link">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
