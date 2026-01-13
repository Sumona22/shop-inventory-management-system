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
import BrandPage from "../pages/admin/products/brands/BrandPage";
import CategoryPage from "../pages/admin/products/categories/CategoyPage";
import ProductVariantsPage from "../pages/admin/products/product-variants/ProductVariantPage";
import ProductPage from "../pages/admin/products/products/ProductPage";
import ProductVariantDetailsPage from "../pages/admin/products/product-variants/ProductVariantDetailsPage";
import StoreManagerStocks from "../pages/store-manager/stocks/StoreManagerStocks";
//import ViewBranch from "../pages/branches/ViewBranch";
//import ManageBranch from "../pages/branches/ManageBranch";
//import AddBranch from "../pages/branches/AddBranch";

/* Supplier Pages */
//import SupplierPage from "../pages/admin/suppliers/SupplierPage";
//import SupplierDetails from "../pages/admin/suppliers/SupplierDetails";
//import OrderDetails from "../pages/admin/suppliers/OrderDetails";
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
import CashierSalesPage from "../pages/cashier/sales/CashierSalesPage";


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
      <Route path="sales" element={<CashierSalesPage />} />





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
  <Route path="order-requests" element={<AdminOrderRequests />} />
  <Route path="order-requests/:orderId" element={<AdminOrderRequestDetails />} />        
  <Route path="product-variants" element={<ProductVariantsPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="brands" element={<BrandPage />} />
        <Route path="product-variants/:variantId" element={<ProductVariantDetailsPage />}/>

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
  <Route path="order-requests" element={<MyOrderRequests />} />
  <Route path="order-requests/new" element={<CreateOrderRequest />} />
  <Route path="order-requests/:id" element={<OrderRequestDetails />} />
  {/* future store manager routes go here */}

  <Route path="/dashboard/store-manager/stocks" element={<StoreManagerStocks />}/>

</Route>
    </Routes>
  );
};

export default AppRouter;
