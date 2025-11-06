import React, { useState } from "react";
import { Box, Paper, Typography, Button, Modal, TextField, MenuItem } from "@mui/material";
import { api } from "../api";

const ManagerDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("StoreStaff");
  const [personalId, setPersonalId] = useState("");
  const [password, setPassword] = useState("");

  const branchId = localStorage.getItem("branchId"); // store this after login

  const createStaff = async () => {
    try {
      await api.post("/users/staff-or-cashier", {
        Role: role,
        Branch_ID: branchId,
        Personal_ID: personalId,
        Password: password,
      });
      alert(`${role} created!`);
      setOpen(false);
    } catch {
      alert("Failed to create user");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to right, #e8f5e9, #c8e6c9)", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" color="success.main" mb={4}>
        Store Manager Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
        <Paper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>Add Staff / Cashier</Typography>
          <Button variant="contained" color="success" onClick={() => setOpen(true)}>Open</Button>
        </Paper>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Create Staff or Cashier</Typography>
          <TextField select fullWidth label="Role" value={role} onChange={(e) => setRole(e.target.value)} sx={{ mb: 2 }}>
            <MenuItem value="StoreStaff">Store Staff</MenuItem>
            <MenuItem value="Cashier">Cashier</MenuItem>
          </TextField>
          <TextField fullWidth label="Personal ID" value={personalId} onChange={(e) => setPersonalId(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={createStaff}>Submit</Button>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default ManagerDashboard;