import React, { useState } from "react";
import { Box, Paper, Typography, Button, Modal, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import {Home, Store, Inventory2, Notifications, Chat, ShoppingCart, BarChart, Payments, Logout, } from "@mui/icons-material";
import { Divider } from "@mui/material";
import {List,ListItemButton,ListItemText,ListItemIcon,Collapse,} from "@mui/material";
import {ExpandLess,ExpandMore,Inventory,Add,Edit,Delete,} from "@mui/icons-material";


const AdministratorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const businessId = localStorage.getItem("businessId"); // stored after registration/login

  // Modal control
  const [openManagerModal, setOpenManagerModal] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openBranch, setOpenBranch] = useState(false);

  // Form fields
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  // Navigation functions
  const functions = [
    { name: "Home", path: "/dashboard/admin", icon: <Home /> },
    { name: "Branches", path: "/branches", icon: <Store /> },
    { name: "Product", path: "/products", icon: <Inventory2 /> },
    { name: "Stock Alerts", path: "/alerts", icon: <Notifications /> },
    { name: "Communication Window", path: "/communication", icon: <Chat /> },
    { name: "Orders", path: "/supplier-page", icon: <ShoppingCart /> },
    { name: "Sales Records", path: "/sales", icon: <BarChart /> },
    { name: "Process Payment", path: "/payment", icon: <Payments /> },
  /*{ name: "Product ", path: "/products/update" },*/
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
/* ================= UI ================= */
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* ============ LEFT SIDEBAR ============ */}
      <Box
        sx={{
          width: 260,
          backgroundColor: "#1e293b",
          color: "#ffffff",
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4}>
          Admin Panel
        </Typography>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
        {functions.map((item, index) => (
        <Button
          key={index}
          fullWidth
          sx={sideBtn}
          startIcon={item.icon}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </Button>
        ))}
        <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />
        <Button
          fullWidth
          startIcon={<Logout />}
          sx={{ ...sideBtn, mt: 4, backgroundColor: "#dc2626" }}
          onClick={() => navigate("/login")}
        >
          Logout
        </Button>
      </Box>

      {/* ============ MAIN CONTENT ============ */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
          p: 6,
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={1} color="primary">
          Welcome, Admin 👋
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" mb={5}>
          Manage your business operations, branches, suppliers, and sales from one place.
        </Typography>

        {/* IMPRESSIVE UI BLOCKS */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper sx={infoCard}>
            <Typography variant="h6">Centralized Control</Typography>
            <Typography variant="body2">
              Monitor and manage all branches from a single dashboard.
            </Typography>
          </Paper>

          <Paper sx={infoCard}>
            <Typography variant="h6">Real-Time Insights</Typography>
            <Typography variant="body2">
              Access sales and supplier data instantly.
            </Typography>
          </Paper>

          <Paper sx={infoCard}>
            <Typography variant="h6">Secure Management</Typography>
            <Typography variant="body2">
              Role-based access for managers and staff.
            </Typography>
          </Paper>
        </Box>
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
const sideBtn = {
  justifyContent: "flex-start",
  mb: 1,
  color: "#fff",
  backgroundColor: "transparent", // 🔥 removes light box
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#b91c1c", // same as Store Manager
  },
};

const infoCard = {
  width: 260,
  p: 3,
  borderRadius: 3,
  backgroundColor: "#ffffff",
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

export default AdministratorDashboard;
