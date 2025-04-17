// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/register";
//import Login from "../features/auth/pages/Login";
//import ThreadList from "../features/threads/pages/ThreadList";

export default function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/threads" element={<ThreadList />} /> */}
        </Routes>
    );
}
