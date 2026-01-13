import React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import {
  Home,
  ReceiptLong,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const sideBtn = {
  justifyContent: "flex-start",
  mb: 1,
  color: "text.primary",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "action.hover",
  },
};

const CashierSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "background.default",
        p: 3,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={4}>
        Cashier Panel
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Button
        fullWidth
        sx={sideBtn}
        startIcon={<Home />}
        onClick={() => navigate("/dashboard/cashier")}
      >
        Home
      </Button>

      <Button
        fullWidth
        sx={sideBtn}
        startIcon={<ReceiptLong />}
        onClick={() => navigate("/dashboard/cashier/sales")}
      >
        New Sale
      </Button>

      <Divider sx={{ my: 2 }} />

      <Button
        fullWidth
        startIcon={<Logout />}
        sx={{ ...sideBtn, mt: 4, backgroundColor: "#dc2626", color: "#fff" }}
        onClick={() => navigate("/login")}
      >
        Logout
      </Button>
    </Box>
  );
};

export default CashierSidebar;
