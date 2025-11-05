import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface LoginProps {
  setRole: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setUserRole] = useState("admin");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  alert(`Logged in as ${role}`);
  setRole(role);

  // Redirect user based on their selected role
  switch (role) {
    case "admin":
      navigate("/dashboard/admin");
      break;
    case "storeManager":
      navigate("/dashboard/storeManager");
      break;
    case "storeStaff":
      navigate("/dashboard/storeStaff");
      break;
    case "storeCashier":
      navigate("/dashboard/storeCashier");
      break;
    default:
      navigate("/");
  }
};


  return (
    <Container maxWidth="xs" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #e3f2fd, #bbdefb)" }}>
      <Paper elevation={6} style={{ padding: "2rem", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#1976d2" }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField label="Email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: "1rem" }} />
          <TextField label="Password" type="password" variant="outlined" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: "1rem" }} />
          <FormControl fullWidth style={{ marginBottom: "1.5rem" }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} label="Role" onChange={(e) => setUserRole(e.target.value)}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="storeManager">Store Manager</MenuItem>
              <MenuItem value="storeStaff">Store Staff</MenuItem>
              <MenuItem value="storeCashier">Store Cashier</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth type="submit" style={{ padding: "0.75rem", fontWeight: "bold", borderRadius: "8px" }}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
