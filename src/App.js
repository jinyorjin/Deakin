import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import NavFooter from "./NavFooter";
import Login from "./Login";
import ConnectPage from "./routes/ConnectPage";
import Signup from "./Signup";
import StaffList from "./staffList";

function App() {
  return (
    <div>
      <NavFooter />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="connect" element={<ConnectPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
