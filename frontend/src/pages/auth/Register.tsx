import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import type { SlideProps } from "@mui/material/Slide";
import { motion } from "framer-motion";
import { api } from "../../api/api";
import warehouseImg from "../../assets/login_bg.png"; //change required

const Register: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [businessId, setBusinessId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register-business", {
        Business_Name: businessName,
        Business_Email: email,
        Address: address,
        Phone: phone,
        Admin_Email: adminEmail,
        Admin_Password: password,
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
      {/* Background overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.25)",
        }}
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        style={{ zIndex: 2, width: "100%", maxWidth: 1000 }}
      >
        <Paper
          sx={{
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
            maxHeight: "90vh",
          }}
        >
          {/* LEFT IMAGE */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${warehouseImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.9)",
              minWidth: 300,
            }}
          />

          {/* RIGHT FORM */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
              py: 3,
              overflowY: "auto",
              background: "transparent",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 360 }}>
              {/* Title */}
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  mb: 2,
                  color: "#00bfae",
                  textShadow:
                    "2px 2px 8px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.8)",
                }}
              >
                Register Your Business
              </Typography>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Business Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Business Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone No"
                  variant="outlined"
                  fullWidth
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Admin's Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  sx={{ mb: 3 }}
                />

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
                  Register
                </Button>

                <Typography
                  variant="body2"
                  sx={{ mt: 2, color: "#555" }}
                >
                  Already registered?{" "}
                  <Button
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{ textTransform: "none" }}
                  >
                    Login
                  </Button>
                </Typography>
              </form>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Snackbar */}
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
