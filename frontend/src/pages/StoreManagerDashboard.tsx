import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

const ManagerDashboard: React.FC = () => {
  const functions = [
    "Manage Communication",
    "Update Product Details",
    "View Sales Records",
    "Stock Alerts",
    "Place Order to Suppliers",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e8f5e9, #c8e6c9)",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="success.main"
        mb={4}
      >
        Store Manager Dashboard
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
                backgroundColor: "#f1f8e9",
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
            <Button variant="contained" color="success" size="small">
              Open
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ManagerDashboard;
