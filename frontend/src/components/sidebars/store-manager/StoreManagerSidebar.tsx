import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Add,
  BarChart,
  Chat,
  Logout,
  Notifications,
  People,
  Store,
} from "@mui/icons-material";

interface Props {
  onAddStaff: () => void;
}

const StoreManagerSidebar: React.FC<Props> = ({ onAddStaff }) => {
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
        <ListItemButton onClick={onAddStaff}>
          <ListItemIcon><Add /></ListItemIcon>
          <ListItemText primary="Add Staff / Cashier" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Manage Staff" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><BarChart /></ListItemIcon>
          <ListItemText primary="Sales Records" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><Chat /></ListItemIcon>
          <ListItemText primary="Communication" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><Notifications /></ListItemIcon>
          <ListItemText primary="Stock Alerts" />
        </ListItemButton>

        <Divider sx={{ my: 2 }} />

        <ListItemButton sx={{ color: "error.main" }}>
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
