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
import TopicPage from '../pages/Topic&Thread/TopicPage';
import ThreadPage from '../pages/Topic&Thread/ThreadPage';
import ChangePassword from '../pages/profile/changePassword';
import About from '../pages/About';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Help from '../pages/Help';
import RecentActivity from '../pages/RecentActivity';
import Chatbot from '../pages/Chatbot';
import Clubs from '../pages/Clubs';
import AdminPage from '../pages/admin/AdminPage';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/auth';
import ProtectedRoute from '../components/ProtectedRoute';
import '../styles/darkMode.css';

//import ThreadList from "../features/threads/pages/ThreadList";

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<LayoutComponent />}>
                            <Route path="/*" element={<Main />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/topic" element={<TopicPage />} />
                            <Route path="/profile/:id" element={<UserProfile1 />} />
                            <Route path="/profile/:id/edit" element={<EditProfile />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/changePassword" element={<ChangePassword />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/help" element={<Help />} />
                            <Route path="/recent" element={<RecentActivity />} />
                            <Route path="/chatbot" element={<Chatbot />} />
                            <Route path="/clubs" element={<Clubs />} />
                            <Route 
                                path="/admin" 
                                element={
                                    <ProtectedRoute requireAdmin>
                                        <AdminPage />
                                    </ProtectedRoute>
                                } 
                            />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* <Route path="/threads" element={<ThreadList />} /> */}
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}
