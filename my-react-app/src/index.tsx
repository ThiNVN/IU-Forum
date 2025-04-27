// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import App from "./app/App";
import Register from "./frontend/pages/auth/register";
import "./index.css";
import App from "./frontend/app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Register />
    </BrowserRouter> */}
    <App />
  </React.StrictMode>
);
