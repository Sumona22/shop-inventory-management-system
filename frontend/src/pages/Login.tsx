import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import warehouseImg from "./login_bg.jpg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setUserRole] = useState("Admin");

  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { Email: email, Password: password, Role: role });

    login(res.data.role, res.data.token);

    if (res.data.Business_ID) localStorage.setItem("businessId", res.data.Business_ID);
    if (res.data.Branch_ID) localStorage.setItem("branchId", res.data.Branch_ID);
    
    if (res.data.role === "Admin") navigate("/dashboard/admin");
    else if (res.data.role === "StoreManager") navigate("/dashboard/store-manager");
    else if (res.data.role === "StoreStaff") navigate("/dashboard/store-staff");
    else if (res.data.role === "Cashier") navigate("/dashboard/cashier");
    else navigate("/");
  } catch {
    alert("Login failed. Please check your credentials.");
  }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${warehouseImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Background contrast overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.55)"
              : "rgba(255,255,255,0.25)",
        }}
      />

      <motion.div
        whileHover={{ scale: 1.035 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        style={{ zIndex: 2 }}
      >
        {/* 🧊 TRANSPARENT GLASS PANEL */}
        <Paper
          sx={{
            width: 900,
            height: 480,
            display: "flex",
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(26px) saturate(180%)",
            WebkitBackdropFilter: "blur(26px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow:
              "0 40px 90px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.25)",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05))",
              pointerEvents: "none",
            },
          }}
        >
          {/* LEFT IMAGE PANEL */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${warehouseImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.9)",
            }}
          />

          {/* RIGHT LOGIN FORM – TRANSPARENT */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
              background: "transparent",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 360 }}>
              {/* Teal Text with Black Shadow */}
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  mb: 1,
                  color: "#00bfae", // teal color
                  textShadow:
                    "2px 2px 8px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.8)",
                }}
              >
                Welcome Back User!
              </Typography>

              <Typography
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "#e5e7eb" : "#374151",
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "0 2px 10px rgba(0,0,0,0.9)"
                      : "0 2px 6px rgba(0,0,0,0.35)",
                }}
              >
                Please Login with valid credentials to access your
                existing account.
              </Typography>

              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    value={role}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="StoreManager">Store Manager</MenuItem>
                    <MenuItem value="StoreStaff">Store Staff</MenuItem>
                    <MenuItem value="Cashier">Cashier</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    py: 1.3,
                    borderRadius: 3,
                    fontWeight: "bold",
                    color: "#fff",
                    background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                    boxShadow: "0 12px 25px rgba(124,58,237,0.45)",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        "0 0 32px rgba(167,139,250,1), 0 18px 45px rgba(124,58,237,0.85)",
                    },
                  }}
                >
                  LOGIN
                </Button>
              </form>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
