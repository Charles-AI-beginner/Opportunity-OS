import React from "react";
import {BrowserRouter, Routes, Outlet, Route, Navigate } from "react-router-dom";

import LandingPage from "./landing.jsx";
import Inbox from "./inbox.jsx";
import Dashboard from "./dashboard.jsx";
import Login from "./auth.jsx";

function ProtectedRoutes(){
  const token = localStorage.getItem('token');
  if(token) return <Outlet />
  else return <Navigate to="/login" />;
}

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route element = {<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
