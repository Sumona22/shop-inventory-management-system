import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

const AdminDashboard: React.FC = () => {
  const functions = [
    "Add / Manage Branch",
    "Add / Delete Product",
    "Stock Alerts",
    "Manage Communication with Managers",
    "Place Order to Suppliers",
    "Update Product Details",
    "View Sales Records",
    "Process Payment",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        mb={4}
      >
        Administrator Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {functions.map((func, idx) => (
          <Paper
            key={idx}
            elevation={4}
            sx={{
              width: 220,
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#e8f5e9",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="textPrimary"
              mb={2}
            >
              {func}
            </Typography>
            <Button variant="contained" color="primary" size="small">
              Open
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
