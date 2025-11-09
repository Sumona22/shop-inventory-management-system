import React, { useState } from "react";
import { Box, Typography, Button, Modal, TextField, MenuItem } from "@mui/material";

import { api } from "../../api";
import BasePaper from "../../components/StyledPaper";

const StoreManagerDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("StoreStaff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const branchId = localStorage.getItem("branchId"); 

  const createStaff = async () => {
    try {
      await api.post("/users/staff-or-cashier", {
        Role: role,
        Branch_ID: branchId,
        Email: email,
        Password: password,
      });
      alert(`${role} created!`);
      setOpen(false);
    } catch {
      alert("Failed to create user");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4, bgcolor: "background.default" }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Store Manager Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
        <BasePaper>
          <Typography fontWeight="bold" mb={2}>Add Staff / Cashier</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>Open</Button>
        </BasePaper>
        <BasePaper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>View & Manage Staff / Cashier Details</Typography>
          <Button variant="contained" >Open</Button>
        </BasePaper>
        <BasePaper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>View Sales Record</Typography>
          <Button variant="contained" >Open</Button>
        </BasePaper>
        <BasePaper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>Communication Window</Typography>
          <Button variant="contained" >Open</Button>
        </BasePaper>
        <BasePaper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>Stock Alert Notification</Typography>
          <Button variant="contained" >Open</Button>
        </BasePaper>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Create Staff or Cashier</Typography>
          <TextField select fullWidth label="Role" value={role} onChange={(e) => setRole(e.target.value)} sx={{ mb: 2 }}>
            <MenuItem value="StoreStaff">Store Staff</MenuItem>
            <MenuItem value="Cashier">Cashier</MenuItem>
          </TextField>
          <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
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

export default StoreManagerDashboard;