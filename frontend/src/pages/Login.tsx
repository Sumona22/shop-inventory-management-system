import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [role, setUserRole] = useState("Admin");
  const [businessId, setBusinessId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [personalId, setPersonalId] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        role,
        Business_ID: role === "Admin" || role === "StoreManager" ? businessId : undefined,
        Branch_ID: role === "StoreManager" || role === "StoreStaff" || role === "Cashier" ? branchId : undefined,
        Personal_ID: role === "StoreStaff" || role === "Cashier" ? personalId : undefined,
        Password: password,
      });

      login(res.data.role, res.data.token);

      if (res.data.role === "Admin") navigate("/dashboard/admin");
      else if (res.data.role === "StoreManager") navigate("/dashboard/storeManager");
      else navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 3, mt: 5 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          {role !== "StoreStaff" && role !== "Cashier" && (
            <TextField label="Business ID" fullWidth value={businessId} onChange={(e) => setBusinessId(e.target.value)} sx={{ mb: 2 }} />
          )}
          {(role === "StoreManager" || role === "StoreStaff" || role === "Cashier") && (
            <TextField label="Branch ID" fullWidth value={branchId} onChange={(e) => setBranchId(e.target.value)} sx={{ mb: 2 }} />
          )}
          {(role === "StoreStaff" || role === "Cashier") && (
            <TextField label="Personal ID" fullWidth value={personalId} onChange={(e) => setPersonalId(e.target.value)} sx={{ mb: 2 }} />
          )}
          <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setUserRole(e.target.value)}>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="StoreManager">Store Manager</MenuItem>
              <MenuItem value="StoreStaff">Store Staff</MenuItem>
              <MenuItem value="Cashier">Cashier</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>Login</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;