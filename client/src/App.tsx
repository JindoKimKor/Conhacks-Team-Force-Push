import "./App.css";

import { BsStars } from "react-icons/bs";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { Navigate, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MenuNav from "./components/menu-nav/MenuNav";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Shop from "./pages/shop/Shop";

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
  },
  {
    icon: <IoSettingsSharp />,
    id: 5,
    label: "Settings",
    onClick: () => {
      return <Navigate to="/shop" />;
    }
  }
];

function App() {
  return (
    <main>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Shop />} path="/shop" />
      </Routes>
      <MenuNav items={menuItems} />
    </main>
  );
}

export default App;
