import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { adminMenu } from "./configAdminSidebar";

const sideBtn = {
  justifyContent: "flex-start",
  mb: 1,
  color: "text.primary",
  backgroundColor: "transparent",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "action.hover",
  },
};

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
    sx={{
        width: 260,
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        minHeight: "100vh",
    }}
    >

      <Typography variant="h6" fontWeight="bold" mb={4}>
        Admin Panel
      </Typography>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />

      {adminMenu.map((item) => (
        <Button
          key={item.label}
          fullWidth
          sx={sideBtn}
          startIcon={item.icon}
          onClick={() => navigate(item.path)}
        >
          {item.label}
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
  );
};

export default AdminSidebar;
