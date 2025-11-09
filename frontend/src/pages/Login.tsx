import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setUserRole] = useState("Admin");
  const navigate = useNavigate();
  const { login } = useAuth();

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
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "background.default",
    }}
  >
    <Paper
      elevation={5}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 360,
        borderRadius: 3,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        {/* ✅ New Email field (replaces Business/Branch/Personal IDs) */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* ✅ Password field */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* ✅ Role dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="StoreManager">Store Manager</MenuItem>
            <MenuItem value="StoreStaff">Store Staff</MenuItem>
            <MenuItem value="Cashier">Cashier</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  </Box>
);
};
export default Login;