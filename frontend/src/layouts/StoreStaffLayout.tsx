import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StoreStaffSidebar from "../components/sidebars/store-staff/StoreStaffSideBar";


const StoreStaffLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <StoreStaffSidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 6, bgcolor: "background.default" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default StoreStaffLayout;
