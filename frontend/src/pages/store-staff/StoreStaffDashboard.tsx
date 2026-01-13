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
  Inventory2,
  Home,
  Logout,Edit,
  NotificationsActive,
} from "@mui/icons-material";

const StoreStaffDashboard: React.FC = () => {
  const [openStock, setOpenStock] = useState(false);

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
          Store Staff Panel
        </Typography>

        {/* Divider after header */}
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.15)" }} />

        <List component="nav">
          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton onClick={() => setOpenStock(!openStock)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Inventory2 />
            </ListItemIcon>
            <ListItemText primary="Stock Management" />
            {openStock ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openStock} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "#cbd5f5", minWidth: 36 }}>
                    <Edit />
                </ListItemIcon>
                <ListItemText primary="Update Stock" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "#cbd5f5", minWidth: 36 }}>
                    <NotificationsActive />
                </ListItemIcon>
                <ListItemText primary="Stock Alerts" />
                </ListItemButton>
            </List>
        </Collapse>


          {/* Space + Divider before logout */}
          <Box sx={{ mt: 3 }} />
          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.15)" }} />

          {/* Logout (full width red) */}
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
          Welcome, Store Staff 👋
        </Typography>

        <Typography variant="body1" textAlign="center" color="text.secondary">
          Use the sidebar to manage stock details, monitor inventory levels,
          and keep store operations running smoothly.
        </Typography>
      </Box>
    </Box>
  );
};

export default StoreStaffDashboard;
