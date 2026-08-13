import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

try{
    ReactDOM.createRoot(document.getElementById("root")).render(
            <App />
    );
}catch (error) {
  document.body.innerHTML = `<div style="color:red; padding:40px; font-weight:bold;">🚨 CAUGHT ERROR: ${error.message}</div>`;
}

