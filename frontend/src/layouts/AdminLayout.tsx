import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebars/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Page content */}
      <Box sx={{ flex: 1, p: 6, bgcolor: "background.default" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
