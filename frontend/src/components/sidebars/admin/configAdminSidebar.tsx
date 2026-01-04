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
  { label: "Branches", path: "/branches", icon: <Store /> },
  { label: "Products", path: "/products", icon: <Inventory2 /> },
  { label: "Stock Alerts", path: "/alerts", icon: <Notifications /> },
  { label: "Communication", path: "/communication", icon: <Chat /> },
  { label: "Orders", path: "/supplier-page", icon: <ShoppingCart /> },
  { label: "Sales Records", path: "/sales", icon: <BarChart /> },
  { label: "Payments", path: "/payment", icon: <Payments /> },
];
