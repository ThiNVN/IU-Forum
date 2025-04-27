// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Register from "../pages/auth/register";
import Main from "../pages/main";
//import Login from "../features/auth/pages/Login";
//import ThreadList from "../features/threads/pages/ThreadList";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path="/main" element={<Main />} />

                <Route path="/register" element={<Register />} />
                {/* <Route path="/login" element={<Login />} />
                <Route path="/threads" element={<ThreadList />} /> */}
            </Routes>
        </Router>
    );
}
