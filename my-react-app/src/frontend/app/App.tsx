// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/register";
import Main from "../pages/main";
import Login from "../pages/auth/
 ZQAxw3e eeeeeeee e e de
//import ThreadList from "../features/threads/pages/ThreadList";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/threads" element={<ThreadList />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
