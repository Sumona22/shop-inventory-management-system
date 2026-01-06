import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ReceiptLong,
  Inventory2,
  Home,
  Logout,
} from "@mui/icons-material";

const CashierDashboard: React.FC = () => {
  const [openSales, setOpenSales] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          background: "#1e293b",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            py: 3,
            fontWeight: "bold",
          }}
        >
          Cashier Panel
        </Typography>

        {/* Divider AFTER header */}
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.15)" }} />

        <List component="nav">
          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton onClick={() => setOpenSales(!openSales)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ReceiptLong />
            </ListItemIcon>
            <ListItemText primary="Sales Record" />
            {openSales ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSales} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="View Sales" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Manage Sales" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Inventory2 />
            </ListItemIcon>
            <ListItemText primary="Stock Alert" />
          </ListItemButton>

          {/* Spacer before logout */}
          <Box sx={{ mt: 3 }} />

          {/* Divider BEFORE logout */}
          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.15)", mb: 2 }} />

          {/* Logout */}
          <ListItemButton
            sx={{
              backgroundColor: "#dc2626",
              "&:hover": {
                backgroundColor: "#b91c1c",
              },
              py: 1.8,
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
          p: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Welcome, Cashier 👋
        </Typography>

        <Typography variant="body1" textAlign="center" color="text.secondary">
          This is your dashboard. Use the sidebar to navigate through sales records and stock alerts.
        </Typography>
      </Box>
    </Box>
  );
};

export default CashierDashboard;
