import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Registered successfully as ${role}! Now login.`);
    navigate("/login");
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
      }}
    >
      <Paper
        elevation={6}
        style={{
          padding: "2rem",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "1.2rem" }}
          />

          <FormControl fullWidth style={{ marginBottom: "1.2rem" }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="storeManager">Store Manager</MenuItem>
              <MenuItem value="storeStaff">Store Staff</MenuItem>
              <MenuItem value="storeCashier">Store Cashier</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{
              padding: "0.7rem",
              borderRadius: "6px",
              fontWeight: "bold",
              marginTop: "0.5rem",
            }}
          >
            Register
          </Button>

          <Typography
            variant="body2"
            style={{ marginTop: "1.5rem", color: "#555" }}
          >
            Already have an account?{" "}
            <Button
              color="primary"
              onClick={() => navigate("/login")}
              style={{ textTransform: "none" }}
            >
              Login
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
