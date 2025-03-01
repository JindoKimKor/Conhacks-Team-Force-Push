import "./App.css";

import { BsStars } from "react-icons/bs";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Route, Routes, useNavigate } from "react-router-dom";

import MenuNav from "./components/menu-nav/MenuNav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  const navigate = useNavigate();

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
      icon: <FaShoppingBag />,
      id: 3,
      label: "Shop",
      onClick: () => {
        void navigate("/shop");
      }
    },
    {
      icon: <BsStars />,
      id: 4,
      label: "Perks",
      onClick: () => {
        void navigate("/perks");
      }
    }
  ];
  return (
    <main>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
      </Routes>
      <MenuNav items={menuItems} />
    </main>
  );
}

export default App;
