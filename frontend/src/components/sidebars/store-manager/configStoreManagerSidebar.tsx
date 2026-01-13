import {
  Home,
  People,
  BarChart,
  Chat,
  Notifications,
  AddShoppingCart,
  ListAlt,
  Inventory,
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
    label: "Stocks",
    path: "/dashboard/store-manager/stocks",
    icon: <Inventory />,
  },

  {
    label: "Sales Records",
    path: "/dashboard/store-manager/sales",
    icon: <BarChart />,
  },
  {
    label: "Order",
    icon: <Chat />,
    subMenu: [
      {
        name: "Create Order",
        icon: <AddShoppingCart />,
        path: "/dashboard/store-manager/order-requests/new",
      },
      {
        name: "My Orders",
        icon: <ListAlt />,
        path: "/dashboard/store-manager/order-requests",
      },
    ],
  },
  {
    label: "Stock Alerts",
    path: "/dashboard/store-manager/alerts",
    icon: <Notifications />,
  },
];
