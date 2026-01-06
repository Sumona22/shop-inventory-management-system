import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const infoCard = {
  width: 260,
  p: 3,
  borderRadius: 3,
  bgcolor: "background.paper",
  color: "text.primary",
};

const AdministratorDashboard: React.FC = () => {
  return (
    <Box
      sx={{
          flex: 1,
          background: "linear-gradient(135deg, #c7dce8ff, #92c4f0ff)",
          p: 10,
          height: "100%",
        }}
    >
      <Typography variant="h3" fontWeight="bold" mb={1} color="primary">
        Welcome, Admin 👋
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={5}>
        Manage your business operations, branches, suppliers, and sales from one place.
      </Typography>

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
  );
};

export default AdministratorDashboard;
