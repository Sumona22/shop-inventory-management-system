// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

import { useAuth } from "../context/AuthContext";
import type { Role } from "../types/auth";

const Login: React.FC = () => {
  const [Role, setRole] = useState<Role>("Admin"); // ✅ capital R
  const [Business_ID, setBusinessID] = useState("");
  const [Branch_ID, setBranchID] = useState("");
  const [Personal_ID, setPersonalID] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ Role, Business_ID, Branch_ID, Personal_ID, Password });

      // Redirect based on Role
      switch (Role) {
        case "Admin":
          navigate("/dashboard/admin");
          break;
        case "StoreManager":
          navigate("/dashboard/storeManager");
          break;
        case "StoreStaff":
          navigate("/dashboard/storeStaff");
          break;
        case "Cashier":
          navigate("/dashboard/storeCashier");
          break;
        default:
          navigate("/");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #e2f1fdff, #a9d5f9ff)",
        textAlign: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          background: "white",
        }}>
        <Typography variant="h5" gutterBottom style={{ color: "#1976d2" }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Business ID"
            fullWidth
            margin="normal"
            required
            value={Business_ID}
            onChange={(e) => setBusinessID(e.target.value)}
          />
          <TextField
            label="Branch ID"
            fullWidth
            margin="normal"
            value={Branch_ID}
            onChange={(e) => setBranchID(e.target.value)}
          />
          <TextField
            label="Personal ID"
            fullWidth
            margin="normal"
            value={Personal_ID}
            onChange={(e) => setPersonalID(e.target.value)}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={Role}
              label="Role"
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="StoreManager">Store Manager</MenuItem>
              <MenuItem value="StoreStaff">Store Staff</MenuItem>
              <MenuItem value="Cashier">Cashier</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth type="submit" style={{ padding: "0.75rem", borderRadius: "8px" }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
