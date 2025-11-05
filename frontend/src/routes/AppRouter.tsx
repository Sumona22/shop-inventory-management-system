// src/routes/AppRouter.tsx
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import ManagerDashboard from "../pages/StoreManagerDashboard";
import  NavBar  from '../components/NavBar'

const AppRouter = () => {
  const [role, setRole] = useState("");
  return (
    <Router>
      <NavBar/>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/storeManager" element={<ManagerDashboard />} />
      </Routes>
    </Router>

  );
};

export default AppRouter;
