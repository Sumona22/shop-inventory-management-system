import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { api } from "../api";

const Register: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register-business", {
        Business_Name: businessName,
        Business_Email: email,
        Primary_Phone_No: phone,
        Password: password,
        Primary_Address: address,
      });

      alert(`Business registered successfully!\nBusiness ID: ${res.data.Business_ID}`);
      localStorage.setItem("businessId", res.data.Business_ID); // optional: store for later use
      navigate("/login");
    } catch {
      alert("Registration failed. Please check your inputs or try again.");
    }
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
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#1976d2" }}>
          Register Your Business
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Business Name"
            variant="outlined"
            fullWidth
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Business Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Primary Phone No"
            variant="outlined"
            fullWidth
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Primary Address"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: "1.5rem" }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{ padding: "0.75rem", fontWeight: "bold", borderRadius: "8px" }}
          >
            Register
          </Button>

          <Typography variant="body2" style={{ marginTop: "1.5rem", color: "#555" }}>
            Already registered?{" "}
            <Button color="primary" onClick={() => navigate("/login")} style={{ textTransform: "none" }}>
              Login
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;