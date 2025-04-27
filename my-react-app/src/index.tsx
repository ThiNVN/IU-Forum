// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./frontend/app/App";
import Register from "./frontend/pages/auth/register";
import "./index.css";
import App from "./frontend/app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
