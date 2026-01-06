import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* Public Pages */
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* Dashboards */
import AdministratorDashboard from "../pages/admin/AdministratorDashboard";
import StoreManagerDashboard from "../pages/store-manager/StoreManagerDashboard";
import StoreStaffDashboard from "../pages/store-staff/StoreStaffDashboard";
import CashierDashboard from "../pages/cashier/CashierDashboard";

/* Branch Pages */
import BranchPage from "../pages/admin/branches/BranchPage";
//import ViewBranch from "../pages/branches/ViewBranch";
//import ManageBranch from "../pages/branches/ManageBranch";
//import AddBranch from "../pages/branches/AddBranch";

/* Supplier Pages */
//import SupplierPage from "../pages/admin/suppliers/SupplierPage";
//import SupplierDetails from "../pages/admin/suppliers/SupplierDetails";
//import OrderDetails from "../pages/admin/suppliers/OrderDetails";


/* ---------- App Router ---------- */
const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboards */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdministratorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/store-manager"
        element={
          <ProtectedRoute role="StoreManager">
            <StoreManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/store-staff"
        element={
          <ProtectedRoute role="StoreStaff">
            <StoreStaffDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/cashier"
        element={
          <ProtectedRoute role="Cashier">
            <CashierDashboard />
          </ProtectedRoute>
        }
      />

      {/* ---------- Admin : Branch Management ---------- */}
      <Route
        path="/branches"
        element={
          <ProtectedRoute role="Admin">
            <BranchPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRouter;
