// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/register";
import LayoutComponent from "../components/layoutComponent";
import Main from "../pages/main/main";
import Login from "../pages/auth/login";
import UserProfile from "../pages/profile/[id]";
import UserProfile1 from "../pages/profile/profile";
import Profile from "../pages/profile/profile";
import EditProfile from "../pages/profile/editProfile";
import HomePage from '../pages/HomePage';
import TopicPage from '../pages/TopicPage';
import ThreadPage from '../pages/ThreadPage';
import ChangePassword from '../pages/profile/changePassword';
import About from '../pages/About';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Help from '../pages/Help';
import RecentActivity from '../pages/RecentActivity';

//import ThreadList from "../features/threads/pages/ThreadList";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutComponent />}>
                    <Route path="/*" element={<Main />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/topic" element={<TopicPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:id" element={<UserProfile1 />} />
                    <Route path="/profile/:id/edit" element={<EditProfile />} />
                    <Route path="/changePassword" element={<ChangePassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/recent" element={<RecentActivity />} />
                </Route>


                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/threads" element={<ThreadList />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
