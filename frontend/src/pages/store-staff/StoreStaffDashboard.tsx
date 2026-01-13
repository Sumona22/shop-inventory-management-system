import { Typography, Box } from "@mui/material";

const StoreStaffDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Welcome, Store Staff 👋
      </Typography>

      <Typography color="text.secondary">
        Use the sidebar to update stock, manage batches and items, and monitor alerts.
      </Typography>
    </Box>
  );
};

export default StoreStaffDashboard;
