import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import AdminSidebar from "../../components/sidebars/admin/AdminSidebar";
import CreateBranchManagerModal from "../../components/modals/CreateBranchManagerModal";

const infoCard = {
  width: 260,
  p: 3,
  borderRadius: 3,
  bgcolor: "background.paper",
  color: "text.primary",
};

const AdministratorDashboard: React.FC = () => {
  const [openManagerModal, setOpenManagerModal] = useState(false);

  return (
    <Box 
    sx={{ 
      display: "flex", 
      minHeight: "100vh" 
    }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
    <Box
    sx={{
      flex: 1,
      bgcolor: "background.default",
      p: 6,
    }}
>

        <Typography variant="h3" fontWeight="bold" mb={1} color="primary">
          Welcome, Admin 👋
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" mb={5}>
          Manage your business operations, branches, suppliers, and sales from one place.
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 4 }}
          onClick={() => setOpenManagerModal(true)}
        >
          + Create Branch & Manager
        </Button>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper sx={infoCard}>
            <Typography variant="h6">Centralized Control</Typography>
            <Typography variant="body2">
              Monitor and manage all branches from a single dashboard.
            </Typography>
          </Paper>

          <Paper sx={infoCard}>
            <Typography variant="h6">Real-Time Insights</Typography>
            <Typography variant="body2">
              Access sales and supplier data instantly.
            </Typography>
          </Paper>

          <Paper sx={infoCard}>
            <Typography variant="h6">Secure Management</Typography>
            <Typography variant="body2">
              Role-based access for managers and staff.
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Modal */}
      <CreateBranchManagerModal
        open={openManagerModal}
        onClose={() => setOpenManagerModal(false)}
      />
    </Box>
  );
};

export default AdministratorDashboard;
