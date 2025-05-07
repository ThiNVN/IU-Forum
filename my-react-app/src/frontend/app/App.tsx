// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/register";
import LayoutComponent from "../components/layoutComponent";
import Main from "../pages/main/main";
import Login from "../pages/auth/login";
import UserProfile from "../pages/profile/[id]";
import Profile from "../pages/profile/profile";
import EditProfile from "../pages/profile/EditProfile";

//import ThreadList from "../features/threads/pages/ThreadList";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutComponent />}>
                    <Route path="/main" element={<Main />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:id" element={<UserProfile />} />
                    <Route path="/profile/:id/edit" element={<EditProfile />} />
                </Route>

                {/* <Route path="/main" element={<Main />} /> */}
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/threads" element={<ThreadList />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
