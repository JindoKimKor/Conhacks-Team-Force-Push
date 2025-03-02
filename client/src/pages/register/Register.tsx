/* eslint-disable react/forbid-component-props */
import "./Register.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

/**
 * Register Component.
 */
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [step, setStep] = useState(1);
  const [showSurvey, setShowSurvey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      options: [
        { icon: "🏪", id: "stores", label: "In stores" },
        { icon: "🛒", id: "online", label: "Online" }
      ],
      question: "Do you do most of your shopping in",
      type: "button"
    },
    {
      id: 2,
      options: [
        { id: "frequent", label: "3+ times / week" },
        { id: "regular", label: "1-2 times / week" },
        { id: "occasional", label: "1+ times / month" },
        { id: "rare", label: "7-12 times / year" }
      ],
      question: "How often do you shop online?",
      type: "button"
    },
    {
      id: 3,
      options: [
        { id: "clothes", label: "Clothes" },
        { id: "electronics", label: "Electronics" },
        { id: "groceries", label: "Groceries" },
        { id: "other", label: "Other" }
      ],
      question: "What do you usually shop for?",
      type: "checkbox"
    }
  ];

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setProgress(33);
    setShowSurvey(true);
  };

  const handleSurveyProgress = (currentQuestion: number) => {
    const newProgress = 33 + (currentQuestion * 67) / questions.length;
    setProgress(Math.min(newProgress, 100));
  };

  const handleSurveyComplete = () => {
    setProgress(100);
    setShowSurvey(false);
    setIsCompleted(true);
  };

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
    setProgress(33);
    setShowSurvey(true);
  };

  return (
    <>
      <div className="space-y-2">
        <Progress className="h-2" value={progress} />
        <p className="text-sm text-gray-500 text-center">
          Step {step} of {questions.length + 1}
        </p>
      </div>
      {!showSurvey ? (
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
      ) : null}

      {/* Hidden Get Started Button */}
      {isCompleted ? (
        <div className="animate-fade-in">
          <Button className="w-full bg-green-500 hover:bg-green-600" size="lg">
            Get Started →
          </Button>
        </div>
      ) : null}

      {/* Survey Modal */}
      {showSurvey ? (
        <Modal
          onComplete={handleSurveyComplete}
          onProgress={handleSurveyProgress}
          questions={questions}
        />
      ) : null}
    </>
  );
}
