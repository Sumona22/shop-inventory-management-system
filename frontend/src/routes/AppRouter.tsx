import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* Public Pages */
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* Dashboards */
import AdminLayout from "../layouts/AdminLayout";
import AdministratorDashboard from "../pages/admin/AdministratorDashboard";

import StoreManagerLayout from "../layouts/StoreManagerLayout";
import StoreManagerDashboard from "../pages/store-manager/StoreManagerDashboard";

import StoreStaffDashboard from "../pages/store-staff/StoreStaffDashboard";

import CashierDashboard from "../pages/cashier/CashierDashboard";

/* Branch Pages */
import BranchPage from "../pages/admin/branches/BranchPage";
import ManageStaffPage from "../pages/store-manager/staff/ManageStaffPage";
import SuppliersPage from "../pages/admin/suppliers/SupplierPage";
import SupplierDetailsPage from "../pages/admin/suppliers/SupplierDetailsPage";
import ProductVariantsPage from "../pages/admin/products/product-variants/ProductVariantPage";
import BrandPage from "../pages/admin/products/brands/BrandPage";
import CategoryPage from "../pages/admin/products/categories/CategoyPage";
import ProductPage from "../pages/admin/products/products/ProductPage";

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
        path="/dashboard/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* /dashboard/admin */}
        <Route index element={<AdministratorDashboard />} />

        {/* /dashboard/admin/branches */}
        <Route path="branches" element={<BranchPage />} />

        {/* /dashboard/admin/suppliers */}
        <Route path="suppliers" element={<SuppliersPage />} />

        {/* /dashboard/admin/suppliers/:supplierId */}
        <Route path="suppliers/:supplierId" element={<SupplierDetailsPage />} />
        <Route path="product-variants" element={<ProductVariantsPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="brands" element={<BrandPage />} />

      </Route>




      {/* ---------- Store Manager : Staff Management ---------- */}
      <Route
        path="dashboard/store-manager"
        element={
          <ProtectedRoute role="StoreManager">
            <StoreManagerLayout />
          </ProtectedRoute>
        }
      >
        {/* /dashboard/store-manager */}
        <Route index element={<StoreManagerDashboard />} />

        {/* /dashboard/store-manager/staff */}
        <Route path="staff" element={<ManageStaffPage />} />
        {/* future store manager routes go here */}


      </Route>
    </Routes>
  );
};

export default AppRouter;
