import {
  Home,
  People,
  BarChart,
  Chat,
  Notifications,
} from "@mui/icons-material";

/* ================= Store Manager Menu ================= */
export const storeManagerMenu = [
  {
    label: "Dashboard",
    path: "/dashboard/store-manager",
    icon: <Home />,
  },
  {
    label: "Manage Staff",
    path: "/dashboard/store-manager/staff",
    icon: <People />,
  },
  {
    label: "Sales Records",
    path: "/dashboard/store-manager/sales",
    icon: <BarChart />,
  },
  {
    label: "Communication",
    path: "/dashboard/store-manager/communication",
    icon: <Chat />,
  },
  {
    label: "Stock Alerts",
    path: "/dashboard/store-manager/alerts",
    icon: <Notifications />,
  },
];
