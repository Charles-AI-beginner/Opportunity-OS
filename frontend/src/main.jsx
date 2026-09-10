import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.jsx";
import "./index.css";

const GOOGLE_CLIENT_ID = "326426559289-310dlmb5qh5es9bui9k1gv1qbcnfs108.apps.googleusercontent.com";

try{
    ReactDOM.createRoot(document.getElementById("root")).render(
            <React.StrictMode>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <App />
              </GoogleOAuthProvider>
            </React.StrictMode>
    );
}catch (error) {
  document.body.innerHTML = `<div style="color:red; padding:40px; font-weight:bold;">🚨 CAUGHT ERROR: ${error.message}</div>`;
}

