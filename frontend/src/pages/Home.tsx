import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import logo from "/inventra-logo.jpg";

const Home = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

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
        textAlign: "center",
        overflow: "hidden",
        px: 2,
        transition: "background 0.6s ease",
        background: isDark
          ? "radial-gradient(circle at center, #1e1e1e 0%, #121212 100%)"
          : "radial-gradient(circle at center, #e3f2fd 0%, #bbdefb 100%)",
      }}
    >
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 30px rgba(100, 181, 246, 0.6)",
        }}
        style={{
          borderRadius: "50%",
          padding: "6px",
          background: isDark
            ? "linear-gradient(135deg, #7e57c2, #512da8)"
            : "linear-gradient(135deg, #7e57c2, #2196f3)",
          display: "inline-block",
          boxShadow: "0px 5px 25px rgba(33, 150, 243, 0.3)",
          marginBottom: "30px",
        }}
      >
        <img
          src={logo}
          alt="Shop Inventory Logo"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "#fff",
          }}
        />
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color={isDark ? "#bbdefb" : "text.primary"}
        >
          Welcome to <span style={{ color: "#1976d2" }}>Inventra 🛒</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Manage products, suppliers, and stores with ease.
        </Typography>
      </motion.div>

      {/* Buttons */}
      <Box display="flex" gap={2}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="/login"
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: "0px 0px 15px rgba(33, 150, 243, 0.6)",
              },
            }}
          >
            Login
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="success"
            component="a"
            href="/register"
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: "0px 0px 15px rgba(76, 175, 80, 0.6)",
              },
            }}
          >
            Register Your Business Now
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;
