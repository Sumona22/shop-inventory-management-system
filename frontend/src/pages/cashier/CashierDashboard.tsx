import { Typography, Box } from "@mui/material";

const CashierDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Welcome, Cashier 👋
      </Typography>

      <Typography color="text.secondary">
        Use the sidebar to create sales and manage daily billing.
      </Typography>
    </Box>
  );
};

export default CashierDashboard;
