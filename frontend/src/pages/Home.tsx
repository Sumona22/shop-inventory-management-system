import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import logo from "/inventra-logo.jpg";

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
        background: "linear-gradient(to bottom right, #bbdefb, #f1f5f9)",
        textAlign: "center",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Animated Logo with Gradient Border + Shadow */}
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
          background: "linear-gradient(135deg, #7e57c2, #2196f3)",
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
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to <span style={{ color: "#1976d2" }}>Inventra 🛒</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Manage products, suppliers, and stores with ease.
        </Typography>
      </motion.div>

      {/* Buttons */}
      <Box display="flex" gap={2}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="/login"
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0px 0px 15px rgba(33, 150, 243, 0.6)",
              },
            }}
          >
            Login
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            variant="contained"
            color="success"
            component="a"
            href="/register"
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0px 0px 15px rgba(76, 175, 80, 0.6)",
              },
            }}
          >
            Signup
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;
