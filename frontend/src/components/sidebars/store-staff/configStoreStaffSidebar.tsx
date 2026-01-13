import {
  Home,
  Inventory2,
  Edit,
  NotificationsActive,
} from "@mui/icons-material";

export const storeStaffMenu = [
  {
    label: "Dashboard",
    path: "/dashboard/store-staff",
    icon: <Home />,
  },
  {
    label: "Stock",
    icon: <Inventory2 />,
    subMenu: [
      {
        name: "Update Stock",
        path: "/dashboard/store-staff/stocks",
        icon: <Edit />,
      },
      {
        name: "Stock Alerts",
        path: "/dashboard/store-staff/alerts",
        icon: <NotificationsActive />,
      },
    ],
  },
];
