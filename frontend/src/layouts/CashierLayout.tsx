import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CashierSidebar from "../components/sidebars/cashier/CashierSidebar";

const CashierLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <CashierSidebar />

      {/* Page Content */}
      <Box sx={{ flex: 1, p: 6, bgcolor: "background.default" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default CashierLayout;
