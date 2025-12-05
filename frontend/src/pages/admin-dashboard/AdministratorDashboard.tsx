import React, { useState } from "react";
import { Box, Paper, Typography, Button, Modal, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

const AdministratorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const businessId = localStorage.getItem("businessId"); // stored after registration/login

  // Modal control
  const [openManagerModal, setOpenManagerModal] = useState(false);

  // Form fields
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  // Navigation functions
  const functions = [
    { name: "View / Manage Branch", path: "/branches" },
    { name: "Add / Delete Product", path: "/products" },
    { name: "Stock Alerts", path: "/alerts" },
    { name: "Manage Communication with Managers", path: "/communication" },
    { name: "Place Order to Suppliers", path: "/orders" },
    { name: "Update Product Details", path: "/products/update" },
    { name: "View Sales Records", path: "/sales" },
    { name: "Process Payment", path: "/payment" },
  ];

  // Function to create branch + store manager
  const handleCreateBranchWithManager = async () => {
    try {
      await api.post("/users/branch-with-manager", {
        Business_ID: businessId,
        Branch_Name: branchName,
        Branch_Address: branchAddress,
        StoreManager_Email: managerEmail,
        StoreManager_Password: managerPassword,
      });

      alert("✅ Branch and Store Manager created successfully!");
      setOpenManagerModal(false);
      setBranchName("");
      setBranchAddress("");
      setManagerEmail("");
      setManagerPassword("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create branch + manager. Please check inputs.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        mb={4}
      >
        Administrator Dashboard
      </Typography>

      {/* Dashboard cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {functions.map((func, idx) => (
          <Paper
            key={idx}
            elevation={4}
            sx={{
              width: 260,
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#e8f5e9",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="textPrimary"
              mb={2}
            >
              {func.name}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                  navigate(func.path);

              }}
            >
              OPEN
            </Button>
          </Paper>
        ))}
      </Box>

      {/* Create Branch + Store Manager Modal */}
      <Modal
        open={openManagerModal}
        onClose={() => setOpenManagerModal(false)}
      >
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
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleCreateBranchWithManager}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

// Modal styling
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

export default AdministratorDashboard;
