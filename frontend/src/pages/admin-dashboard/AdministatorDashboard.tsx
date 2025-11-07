import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdministratorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const functions = [
    { name: "View / Manage Branch", path: "/branches" },
    { name: "Add / Delete Product", path: "/products" },
    { name: "Stock Alerts", path: "/alerts" },
    { name: "Manage Communication with Managers", path: "/communication" },
    { name: "Place Order to Suppliers", path: "/orders" },
    { name: "Update Product Details", path: "/products/update" },
    { name: "View Sales Records", path: "/sales" },
    { name: "Process Payment", path: "/payment" },
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
              width: 260,
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
              {func.name}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                console.log("Button clicked:", func.path);
                navigate(func.path);
              }}
            >
              OPEN
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default AdministratorDashboard;
