import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

import AdminDashboard from "../pages/admin-dashboard/AdminDashboard";
import AdministratorDashboard from "../pages/admin-dashboard/AdministatorDashboard";
import BranchPage from "../pages/admin-dashboard/BranchPage";
import StoreManagerDashboard from "../pages/store-manager-dashboard/StoreManagerDashboard";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import ManageBranch from "../pages/admin-dashboard/ManageBranch";
import AddBranch from "../pages/admin-dashboard/AddBranch";
import ViewBranch from "../pages/admin-dashboard/ViewBranch";
import Register from "../pages/Register";
import StoreStaffDashboard from "../pages/store-staff-dashboard/StoreStaffDashboard";
import CashierDashboard from "../pages/cashier-dashboard/CashierDashboard";

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
          path="/dashboard/store-manager"
          element={<ProtectedRoute role="StoreManager"><StoreManagerDashboard /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/storeManager"
          element={<ProtectedRoute role="StoreStaff"><StoreStaffDashboard /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/storeManager"
          element={<ProtectedRoute role="Cashier"><CashierDashboard /></ProtectedRoute>}
        />

        {/* AdminDashboard Routes */}
        <Route path="/branches" element={<ProtectedRoute role="Admin"><BranchPage /></ProtectedRoute>}/>
        <Route path="/branches/view" element={<ProtectedRoute role="Admin"><ViewBranch /></ProtectedRoute>}/>
        <Route path="/branches/manage" element={<ProtectedRoute role="Admin"><ManageBranch /></ProtectedRoute>}/>
        <Route path="/branches/manage/add" element={<ProtectedRoute role="Admin"><AddBranch /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;