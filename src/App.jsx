import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./landing.jsx";
import Inbox from "./inbox.jsx";
import Dashboard from "./dashboard.jsx";
import Login from "./login.jsx";

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inbox" element={<Inbox />} />
    </Routes>
  )
}
