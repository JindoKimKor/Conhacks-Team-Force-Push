import "./App.css";

import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

function App() {
  return (
    <main>
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </main>
  );
}

export default App;
