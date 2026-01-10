import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { api } from "../../api/api";

interface Props {
  open: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "text.primary",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CreateBranchManagerModal: React.FC<Props> = ({ open, onClose }) => {
  const businessId = localStorage.getItem("businessId");

  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/users/branch-with-manager", {
        Business_ID: businessId,
        Branch_Name: branchName,
        Branch_Address: branchAddress,
        StoreManager_Email: managerEmail,
        StoreManager_Password: managerPassword,
      },);

      alert("✅ Branch and Store Manager created successfully!");
      onClose();
      setBranchName("");
      setBranchAddress("");
      setManagerEmail("");
      setManagerPassword("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create branch and manager");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Create Branch & Store Manager
        </Typography>

        <TextField
          fullWidth
          label="Branch Name"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Branch Address"
          value={branchAddress}
          onChange={(e) => setBranchAddress(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Manager Email"
          type="email"
          value={managerEmail}
          onChange={(e) => setManagerEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Manager Password"
          type="password"
          value={managerPassword}
          onChange={(e) => setManagerPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateBranchManagerModal;
