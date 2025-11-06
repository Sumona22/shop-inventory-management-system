// src/pages/Home.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "Admin") navigate("/dashboard/admin");
    else if (role === "StoreManager") navigate("/dashboard/storeManager");
    else if (role === "StoreStaff") navigate("/dashboard/storeStaff");
    else if (role === "Cashier") navigate("/dashboard/storeCashier");
  }, [role, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #bbdefb, #64b5f6)",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to Shop Inventory System 🛒
      </Typography>

      <Typography variant="h6" color="text.secondary" mb={4}>
        Manage products, suppliers, and stores with ease.
      </Typography>

      <Box display="flex" gap={2}>
        <Button variant="contained" color="primary" component="a" href="/login">
          Login
        </Button>
        <Button variant="contained" color="success" component="a" href="/register">
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Home;