import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import ManagerDashboard from "../pages/StoreManagerDashboard";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }: { children: JSX.Element; role: string }) => {
  const { token, role: userRole } = useAuth();
  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/admin"
          element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/storeManager"
          element={<ProtectedRoute role="StoreManager"><ManagerDashboard /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;