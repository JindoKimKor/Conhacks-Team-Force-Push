import "./App.css";

import { BsStars } from "react-icons/bs";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Route, Routes } from "react-router-dom";

import MenuNav from "./components/menu-nav/MenuNav";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";

const menuItems = [
  {
    icon: <GoGoal />,
    id: 1,
    label: "Goals",
    onClick: () => {
      console.log("Goals clicked");
    }
  },
  {
    badge: 3,
    icon: <FaHeart />,
    id: 2,
    label: "Buddy",
    onClick: () => {
      console.log("Buddy clicked");
    }
  },
  {
    icon: <FaShoppingBag />,
    id: 3,
    label: "Shop",
    onClick: () => {
      console.log("Shop clicked");
    }
  },
  {
    icon: <BsStars />,
    id: 4,
    label: "Perks",
    onClick: () => {
      console.log("Perks clicked");
    }
  }
];

function App() {
  return (
    <main>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Home />} path="/" />
      </Routes>
      <MenuNav items={menuItems} />
    </main>
  );
}

export default App;
