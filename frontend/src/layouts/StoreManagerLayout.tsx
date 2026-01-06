import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StoreManagerSidebar from "../components/sidebars/store-manager/StoreManagerSidebar";

const StoreManagerLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <StoreManagerSidebar />

      {/* Page Content */}
      <Box sx={{ flex: 1, p: 6, bgcolor: "background.default" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default StoreManagerLayout;
