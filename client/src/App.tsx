import "./App.css";

import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdLeaderboard } from "react-icons/md";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import MenuNav from "./components/menu-nav/MenuNav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Metrics from "./pages/metrics/Metrics";
import Perks from "./pages/perks/Perks";
import Register from "./pages/register/Register";
import Shop from "./pages/shop/Shop";

function App() {
  const navigate = useNavigate();
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      // Set flag for first-time visitors
      localStorage.setItem("hasVisitedBefore", "true");
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const menuItems = [
    {
      icon: <GoGoal />,
      id: 1,
      label: "Goals",
      onClick: () => {
        void navigate("/");
      }
    },
    {
      badge: 3,
      icon: <FaHeart />,
      id: 2,
      label: "Buddy",
      onClick: () => {
        void navigate("/buddy");
      }
    },
    {
      icon: <BsStars />,
      id: 4,
      label: "Perks",
      onClick: () => {
        void navigate("/perks");
      }
    },
    {
      icon: <MdLeaderboard />,
      id: 5,
      label: "Metrics",
      onClick: () => {
        void navigate("/metrics");
      }
    },
    {
      icon: <FaShoppingBag />,
      id: 3,
      label: "Shop",
      onClick: () => {
        void navigate("/shop");
      }
    }
  ];
  return (
    <main>
      <Routes>
        <Route
          element={isFirstVisit ? <Navigate replace to="/login" /> : <Home />}
          path="/"
        />
        <Route element={<Login />} path="/login" />
        <Route element={<Shop />} path="/shop" />
        <Route element={<Register />} path="/register" />
        <Route element={<Metrics />} path="/metrics" />
        <Route element={<Perks />} path="/perks" />
      </Routes>
      <MenuNav items={menuItems} />
    </main>
  );
}

export default App;
