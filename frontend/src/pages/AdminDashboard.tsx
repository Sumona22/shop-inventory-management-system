import React, { useState } from "react";
import { Box, Paper, Typography, Button, Modal, TextField, MenuItem } from "@mui/material";
import { api } from "../api";

const AdminDashboard: React.FC = () => {
  const [openBranch, setOpenBranch] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [managerBranchId, setManagerBranchId] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  const businessId = localStorage.getItem("businessId"); // store this after login/register

  const createBranch = async () => {
    try {
      await api.post("/users/branch", {
        Business_ID: businessId,
        Branch_Name: branchName,
        Branch_Address: branchAddress,
      });
      alert("Branch created!");
      setOpenBranch(false);
    } catch {
      alert("Failed to create branch");
    }
  };

  const createManager = async () => {
    try {
      await api.post("/users/manager", {
        Business_ID: businessId,
        Branch_ID: managerBranchId,
        Password: managerPassword,
      });
      alert("Manager created!");
      setOpenManager(false);
    } catch {
      alert("Failed to create manager");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(to right, #e3f2fd, #bbdefb)", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" mb={4}>
        Administrator Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
        <Paper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>Add / Manage Branch</Typography>
          <Button variant="contained" onClick={() => setOpenBranch(true)}>Open</Button>
        </Paper>
        <Paper sx={{ p: 3, width: 220, textAlign: "center", borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>Add Store Manager</Typography>
          <Button variant="contained" onClick={() => setOpenManager(true)}>Open</Button>
        </Paper>
      </Box>

      {/* Add Branch Modal */}
      <Modal open={openBranch} onClose={() => setOpenBranch(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Create Branch</Typography>
          <TextField fullWidth label="Branch Name" value={branchName} onChange={(e) => setBranchName(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Branch Address" value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={createBranch}>Submit</Button>
        </Box>
      </Modal>

      {/* Add Manager Modal */}
      <Modal open={openManager} onClose={() => setOpenManager(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Create Store Manager</Typography>
          <TextField fullWidth label="Branch ID" value={managerBranchId} onChange={(e) => setManagerBranchId(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" value={managerPassword} onChange={(e) => setManagerPassword(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={createManager}>Submit</Button>
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

export default AdminDashboard;