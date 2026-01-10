import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Logout, Store } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { storeManagerMenu } from "./configStoreManagerSidebar";

const StoreManagerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3} textAlign="center">
        <Store sx={{ mr: 1 }} />
        Store Manager
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        {storeManagerMenu.map((item) => (
          <ListItemButton
            key={item.label}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}

        <Divider sx={{ my: 2 }} />

        <ListItemButton
          sx={{ color: "error.main" }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default StoreManagerSidebar;
