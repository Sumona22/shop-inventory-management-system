import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarningIcon from "@mui/icons-material/Warning";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";

const statCard = {
  p: 3,
  borderRadius: 4,
  height: "100%",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.15)",
  },
};

const infoCard = {
  p: 3,
  borderRadius: 4,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const AdministratorDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eaf4fb, #d6ebff)",
        p: { xs: 3, md: 6 },
      }}
    >
      {/* ================= HERO ================= */}
      <Paper
        sx={{
          p: 5,
          borderRadius: 5,
          mb: 5,
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Welcome back, Admin 👋
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
          Control operations, inventory, orders, and branches from one powerful admin platform.
        </Typography>
      </Paper>

      {/* ================= STATS ================= */}
      <Grid container spacing={3} mb={5}>
        {/* BRANCHES */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={statCard}
            onClick={() => navigate("/dashboard/admin/branches")}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#1976d2" }}>
                <StoreIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Branches</Typography>
                <Typography variant="h4" fontWeight={700}>
                  Manage
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* PRODUCTS */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={statCard}
            onClick={() =>
              navigate("/dashboard/admin/product-variants")
            }
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#2e7d32" }}>
                <InventoryIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Products</Typography>
                <Typography variant="h4" fontWeight={700}>
                  Inventory
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* STOCK ALERTS (NO NAVIGATION) */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ ...statCard, cursor: "default" }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#ed6c02" }}>
                <WarningIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Stock Alerts</Typography>
                <Typography variant="h4" fontWeight={700}>
                  Monitor
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* ORDERS */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={statCard}
            onClick={() =>
              navigate("/dashboard/admin/order-requests")
            }
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#9c27b0" }}>
                <ReceiptLongIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Orders</Typography>
                <Typography variant="h4" fontWeight={700}>
                  Control
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= CAPABILITIES ================= */}
      {/* ================= CAPABILITIES ================= */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Platform Capabilities
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={infoCard}>
            <Typography variant="h6" fontWeight={600}>
              Centralized Control
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Manage all branches, warehouses, users, and configurations from one unified admin panel.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={infoCard}>
            <Typography variant="h6" fontWeight={600}>
              Real-Time Insights
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Track inventory movement, sales performance, and order flow in real time.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={infoCard}>
            <Typography variant="h6" fontWeight={600}>
              Secure Management
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Role-based access ensures data security and controlled permissions across teams.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={infoCard}>
            <Typography variant="h6" fontWeight={600}>
              Smart Order Processing
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Review, approve, modify, or reject order requests efficiently with full audit visibility.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default AdministratorDashboard;
