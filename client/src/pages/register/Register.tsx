/* eslint-disable react/forbid-component-props */
import "./Register.css";

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showSurvey, setShowSurvey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [q1, setQ1] = useState<string | string[]>(""); // Update state variable to handle new data format
  const [q2, setQ2] = useState<string | string[]>(""); // Update state variable to handle new data format
  const [q3, setQ3] = useState<string | string[]>(""); // Update state variable to handle new data format
  const [q4, setQ4] = useState<string | string[]>(""); // Update state variable to handle new data format

  const questions = [
    {
      id: 1,
      options: [
        { icon: "🚗", id: "Car", label: "Car" },
        { icon: "🚶‍♂️", id: "Walk", label: "Walking" },
        { icon: "🚲", id: "Bike", label: "Cycling" },
        { icon: "🚗", id: "Bus", label: "Bussing" }
      ],
      question: "Preferred transportaion method:",
      type: "button"
    },
    {
      id: 2,
      options: [
        { id: "0-10 km", label: "0-10 km" },
        { id: "10-30 km", label: "10-30 km" },
        { id: "30-50 km", label: "30-50 km" },
        { id: "50+", label: "50+" }
      ],
      question: "How far do you typically travel each week?",
      type: "button"
    },
    {
      id: 3,
      options: [
        { id: "0-2", label: "0-2" },
        { id: "3-5", label: "3-5" },
        { id: "6+", label: "6+" }
      ],
      question: "How many garbage bags do you dispose of each week?",
      type: "button"
    },
    {
      id: 4,
      options: [
        { id: "Never", label: "Never" },
        { id: "Sometimes", label: "Sometimes" },
        { id: "Often", label: "Often" },
        { id: "Always", label: "Always" }
      ],
      question: "How often do you recycle?",
      type: "button"
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

    // Send Api Request
    axios
      .post("http://localhost:3000/api/users", {
        email,
        name,
        password,
        profiles: {
          sign_up_selections: {
            commute_distance: q2, // Update API request to handle new data format
            commute_type: q1, // Update API request to handle new data format
            garbage_bags_biweekly: q3, // Update API request to handle new data format
            recycle_frequency: q4 // Update API request to handle new data format
          }
        }
      })
      .then(response => {
        console.log("Registration successful:", response.data);
        // Redirect to login page after successful registration
        void navigate("/login");
      })
      .catch(error => {
        console.error("Error during registration:", error);
        setError(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
        void navigate("/");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
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
          q1Callback={setQ1}
          q2Callback={setQ2}
          q3Callback={setQ3}
          q4Callback={setQ4}
          questions={questions}
        />
      ) : null}
    </>
  );
}
