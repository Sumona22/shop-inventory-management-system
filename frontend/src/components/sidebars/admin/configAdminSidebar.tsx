import {
  Home,
  Store,
  Inventory2,
  Notifications,
  Chat,
  ShoppingCart,
  BarChart,
  Payments,
} from "@mui/icons-material";

export const adminMenu = [
  { label: "Home", path: "/dashboard/admin", icon: <Home /> },
  { label: "Branches", path: "/dashboard/admin/branches", icon: <Store /> },
  { label: "Products", path: "/dashboard/admin/products", icon: <Inventory2 /> },
  { label: "Stock Alerts", path: "/dashboard/admin/alerts", icon: <Notifications /> },
  { label: "Order Requests", path: "/dashboard/admin/order-requests", icon: <Chat /> },
  { label: "Orders", path: "/dashboard/admin/suppliers", icon: <ShoppingCart /> },
  { label: "Sales Records", path: "/dashboard/admin/sales", icon: <BarChart /> },
  { label: "Payments", path: "/dashboard/admin/payments", icon: <Payments /> },
];
