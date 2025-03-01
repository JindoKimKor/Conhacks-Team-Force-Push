import "./App.css";

import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";

function App() {
  return (
    <main>
      <Routes>
        <Route element={<Login />} path="/login" />
      </Routes>
    </main>
  );
}

export default App;
