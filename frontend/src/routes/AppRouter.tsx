import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* Public Pages */
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* Layouts */
import AdminLayout from "../layouts/AdminLayout";
import StoreManagerLayout from "../layouts/StoreManagerLayout";

/* Admin Pages */
import AdministratorDashboard from "../pages/admin/AdministratorDashboard";
import AdminSalesDashboard from "../pages/admin/sales/AdminSalesDashBoard";
import BranchPage from "../pages/admin/branches/BranchPage";
import SuppliersPage from "../pages/admin/suppliers/SupplierPage";
import SupplierDetailsPage from "../pages/admin/suppliers/SupplierDetailsPage";
import AdminOrderRequests from "../pages/admin/order-requests/AdminOrderRequests";
import AdminOrderRequestDetails from "../pages/admin/order-requests/AdminOrderRequestDetails";

/* Store Manager Pages */
import StoreManagerDashboard from "../pages/store-manager/StoreManagerDashboard";
import StoreManagerSalesPage from "../pages/store-manager/sales/StoreManagerSalesDashBoard";
import ManageStaffPage from "../pages/store-manager/staff/ManageStaffPage";
import MyOrderRequests from "../pages/store-manager/orders/MyOrderRequests";
import CreateOrderRequest from "../pages/store-manager/orders/CreateOrderRequest";
import OrderRequestDetails from "../pages/store-manager/orders/OrderRequestDetails";

/* Store Staff & Cashier */
import StoreStaffDashboard from "../pages/store-staff/StoreStaffDashboard";
import CashierDashboard from "../pages/cashier/CashierDashboard";


/* ---------- App Router ---------- */
const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------- ADMIN ---------- */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdministratorDashboard />} />
        <Route path="sales" element={<AdminSalesDashboard />} />
        <Route path="branches" element={<BranchPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="suppliers/:supplierId" element={<SupplierDetailsPage />} />
        <Route path="order-requests" element={<AdminOrderRequests />} />
        <Route
          path="order-requests/:orderId"
          element={<AdminOrderRequestDetails />}
        />
      </Route>

      {/* ---------- STORE MANAGER ---------- */}
      <Route
        path="/dashboard/store-manager"
        element={
          <ProtectedRoute role="StoreManager">
            <StoreManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StoreManagerDashboard />} />
        <Route path="sales" element={<StoreManagerSalesPage />} />
        <Route path="staff" element={<ManageStaffPage />} />
        <Route path="order-requests" element={<MyOrderRequests />} />
        <Route path="order-requests/new" element={<CreateOrderRequest />} />
        <Route path="order-requests/:id" element={<OrderRequestDetails />} />
      </Route>

      {/* ---------- STORE STAFF ---------- */}
      <Route
        path="/dashboard/store-staff"
        element={
          <ProtectedRoute role="StoreStaff">
            <StoreStaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* ---------- CASHIER ---------- */}
      <Route
        path="/dashboard/cashier"
        element={
          <ProtectedRoute role="Cashier">
            <CashierDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
