import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useNotifications } from "../context/NotificationContext";
import { markNotificationReadService } from "../services/notificationService";

interface NavBarProps {
  toggleMode: () => void;
  mode: "light" | "dark";
}

const NavBar: React.FC<NavBarProps> = ({ toggleMode, mode }) => {
  const { role, logout } = useAuth();
  const { notifications, setNotifications } = useNotifications();

  const unreadCount = notifications.filter(
    (n: any) => !n.Is_Read
  ).length;

  const navigate = useNavigate();

  // 🔔 Notification menu state (ADDED)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenNotifications = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#0a2540",
        borderBottom: "1px solid #1e3a8a",
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: 1,
            color: "#ffffff",
          }}
          onClick={() => navigate("/")}
        >
          🏪 Inventra
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { backgroundColor: "#1e40af" },
            }}
          >
            Home
          </Button>

          {role === "Admin" && (
            <Button
              color="inherit"
              component={Link}
              to="/dashboard/admin"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#1e40af" },
              }}
            >
              Admin
            </Button>
          )}

          {role === "StoreManager" && (
            <Button
              color="inherit"
              component={Link}
              to="/dashboard/storeManager"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#1e40af" },
              }}
            >
              Manager
            </Button>
          )}

          {role && (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#b91c1c" },
              }}
            >
              Logout
            </Button>
          )}

          {/* 🔔 Notifications */}
          <IconButton
            onClick={handleOpenNotifications}
            sx={{
              color: "#ffffff",
              backgroundColor: "#1e3a8a",
              "&:hover": { backgroundColor: "#1e40af" },
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* 🔔 Notification Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseNotifications}
            PaperProps={{ sx: { width: 360 } }}
          >
            {notifications.length === 0 && (
              <MenuItem>No notifications</MenuItem>
            )}

            {notifications.map((n: any) => (
              <MenuItem
                key={n._id}
                onClick={async () => {
                  handleCloseNotifications();

                  if (!n.Is_Read) {
                    await markNotificationReadService(n._id);
                    setNotifications((prev: any[]) =>
                      prev.map((x) =>
                        x._id === n._id ? { ...x, Is_Read: true } : x
                      )
                    );
                  }

                  if (n.Order_Request_ID) {
                    if (role === "Admin") {
                      navigate(
                        `/dashboard/admin/order-requests/${n.Order_Request_ID}`
                      );
                    } else if (role === "StoreManager") {
                      navigate(
                        `/dashboard/store-manager/order-requests/${n.Order_Request_ID}`
                      );
                    }
                  }
                }}
                sx={{
                  whiteSpace: "normal",
                  alignItems: "flex-start",
                  backgroundColor: n.Is_Read ? "inherit" : "#eef2ff",
                }}
              >
                <Box>
                  <Typography fontWeight={600}>{n.Title}</Typography>
                  <Typography fontSize={13}>{n.Message}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Theme Toggle */}
          <IconButton
            sx={{
              ml: 1,
              color: "#ffffff",
              backgroundColor: "#1e3a8a",
              "&:hover": { backgroundColor: "#1e40af" },
            }}
            onClick={toggleMode}
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
