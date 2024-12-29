import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/LandingPage";
import AdminPanel from "./components/AdminPanel";
import Register from "./components/Register";
import Navbar from "./components/navbar";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setToken={setToken} setRole={setRole} />} />
        <Route
          path="/admin"
          element={<AdminPanel role={role} token={token} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
