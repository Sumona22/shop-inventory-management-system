import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import type { SlideProps } from "@mui/material/Slide";

import { api } from "../api";

const Register: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [businessId, setBusinessId] = useState("");

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

      const id = res.data.Business_ID;
      setBusinessId(id);
      setOpenSnackbar(true);
      localStorage.setItem("businessId", id);

    } catch {
      alert("Registration failed. Please check your inputs or try again.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(businessId);
      alert("✅ Business ID copied to clipboard!");
    } catch {
      alert("❌ Failed to copy. Please try manually.");
    }
  };

  function SlideDownTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}


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
          maxWidth: 450,
          borderRadius: 3,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom >
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
            label="Phone No"
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
            label="Address"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: "1.5rem" }}
          />
          <TextField
            label="Admin's Email"
            variant="outlined"
            fullWidth
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={8000}
        onClose={() => {
          setOpenSnackbar(false);
          navigate("/login");
        }}
        TransitionComponent={SlideDownTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.success.main
                : "#26822bff",
            color: theme.palette.getContrastText(
              theme.palette.mode === "light"
                ? theme.palette.success.main
                : "#2e7d32"
            ),
            borderRadius: 3,
            fontWeight: "bold",
          })}
          action={
            <Button color="inherit" size="small" onClick={handleCopy}>
              Copy ID
            </Button>
          }
        >
          Business registered successfully! <br />
          <strong>Business ID:</strong> {businessId}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;