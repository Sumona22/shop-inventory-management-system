import React, { useState } from "react";
import { Box, Typography, Button, Modal, TextField, MenuItem, List, ListItemButton, ListItemIcon, ListItemText, Divider,} from "@mui/material";
import {People,Add,BarChart,Chat,Notifications,Logout,Store,} from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import { api } from "../../api";

const drawerWidth = 240;

const StoreManagerDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("StoreStaff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const branchId = localStorage.getItem("branchId");
  const businessId = localStorage.getItem("businessId");
  const token = localStorage.getItem("token");

  const createStaff = async () => {
    try {
      await api.post(
        "/users/staff-or-cashier",
        {
          Role: role,
          Email: email,
          Password: password,
          Business_ID: businessId,
          Branch_ID: branchId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`${role} created successfully!`);
      setOpen(false);
      setEmail("");
      setPassword("");
      setRole("StoreStaff");
    } catch (err: any) {
      console.error("❌ Staff/Cashier creation failed:", err.response?.data || err.message);
      alert(`Failed to create user: ${err.response?.data?.message || err.message}`);
    }
  };

 return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", bgcolor: "#f4f6f8" }}>
      {/* ================= Sidebar ================= */}
      <Box
        sx={{
          width: drawerWidth,
          bgcolor: "#1e293b",
          color: "#fff",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
          textAlign="center"
        >
          <Store sx={{ mr: 1 }} />
          Store Manager
        </Typography>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />

        <List>
          <ListItemButton onClick={() => setOpen(true)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Staff / Cashier" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Manage Staff" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Sales Records" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Communication" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Stock Alerts" />
          </ListItemButton>

          <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

          <ListItemButton
            sx={{
              backgroundColor: "#dc2626", 
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#b91c1c", // darker red on hover
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>

        </List>
      </Box>
{/* ================= Main Content ================= */}
<Box
  sx={{
    flex: 1,height: "100vh",
    background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
    p: 4,                    
  }}
>
  {/* Header */}
  <Typography
    variant="h4"
    fontWeight="bold"
    mb={1}
    color="primary"
  >
    Welcome, Store Manager 👋
  </Typography>

  <Typography
    color="text.secondary"
    mb={3}
    sx={{ maxWidth: 1000 }}  
  >
    Manage staff, track sales performance, monitor inventory alerts,
    and communicate efficiently — all from one centralized dashboard.
  </Typography>

  {/* Store Overview Text (NO CARD, SPREAD TEXT) */}
  <Typography
    variant="body1"
    color="text.secondary"
    mb={3}
    sx={{
      maxWidth: "100%",
      lineHeight: 1.6,
    }}
  >
    This dashboard gives you quick access to all store operations.
    Use the sidebar to add or manage staff, review sales records,
    receive stock alerts, and communicate with your team — all without
    navigating away from this screen.
  </Typography>

  {/* Store Overview */}
<Box sx={{ mt: 4, maxWidth: 500 }}>
  <Typography
    variant="h6"
    fontWeight="bold"
    mb={2}
    color="text.primary"
  >
    Store Overview
  </Typography>

  {/* Total Staff */}
  <Box sx={overviewItemStyle}>
    <PeopleIcon color="primary" />
    <Box>
      <Typography variant="body2" color="text.secondary">
        Total Staff
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        —
      </Typography>
    </Box>
  </Box>

  {/* Today's Sales */}
  <Box sx={overviewItemStyle}>
    <AttachMoneyIcon color="success" />
    <Box>
      <Typography variant="body2" color="text.secondary">
        Today’s Sales
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        —
      </Typography>
    </Box>
  </Box>

  {/* Low Stock Alerts */}
  <Box sx={overviewItemStyle}>
    <InventoryIcon color="warning" />
    <Box>
      <Typography variant="body2" color="text.secondary">
        Low Stock Alerts
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        —
      </Typography>
    </Box>
  </Box>
</Box>

</Box>
      {/* ================= Modal (UNCHANGED) ================= */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Create Staff or Cashier
          </Typography>

          <TextField
            select
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="StoreStaff">Store Staff</MenuItem>
            <MenuItem value="Cashier">Cashier</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth onClick={createStaff}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

/*const infoBoxStyle = {
  bgcolor: "#f9fafb",
  p: 2,
  borderRadius: 2,
  textAlign: "center",
};*/

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
const overviewItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 2,
  mb: 1.5,
  borderRadius: 2,
  bgcolor: "rgba(255,255,255,0.65)",
};


export default StoreManagerDashboard;
