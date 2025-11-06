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
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility, 
  VisibilityOff
} from '@mui/icons-material';

import { registerBusinessAPI } from "../api/auth";

interface IBusiness {
  Business_Name: string;
  Business_Email: string;
  Primary_Phone_No: string;
  Password: string;
  Primary_Address: string;
}

const Register: React.FC = () => {

  const [formData, setFormData] = useState<IBusiness>({
    Business_Name: "",
    Business_Email: "",
    Primary_Phone_No: "",
    Password: "",
    Primary_Address: "",
  })

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await registerBusinessAPI(formData);

      alert("Business registered successfully!");

      // Optionally navigate to login page
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
            Register Your Business
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              margin="normal"
              label="Business Name"
              name="Business_Name"
              variant="outlined"
              value={formData?.Business_Name}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Business Email"
              name="Business_Email"
              variant="outlined"
              value={formData?.Business_Email}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Primary Phone Number"
              name="Primary_Phone_No"
              variant="outlined"
              value={formData?.Primary_Phone_No}
              onChange={handleChange}
              required
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

            <TextField
              fullWidth
              margin="normal"
              label="Primary Address"
              name="Primary_Address"
              variant="outlined"
              value={formData?.Primary_Address}
              onChange={handleChange}
              required
            />

            <Button variant="contained" color="primary" fullWidth type="submit" style={{ padding: "0.75rem", borderRadius: "8px" }}>
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Register;
