import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import ManagerDashboard from "../pages/StoreManagerDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Store Manager Dashboard */}
        <Route
          path="/dashboard/storeManager"
          element={
            <ProtectedRoute allowedRoles={["StoreManager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Store Staff Dashboard (if needed) */}
        <Route
          path="/dashboard/storeStaff"
          element={
            <ProtectedRoute allowedRoles={["StoreStaff"]}>
              <div>Store Staff Dashboard (implement later)</div>
            </ProtectedRoute>
          }
        />

        {/* Cashier Dashboard (if needed) */}
        <Route
          path="/dashboard/storeCashier"
          element={
            <ProtectedRoute allowedRoles={["Cashier"]}>
              <div>Cashier Dashboard (implement later)</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
