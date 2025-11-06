import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🏪 Shop Inventory Management
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {role === "Admin" && (
            <Button color="inherit" component={Link} to="/dashboard/admin">Admin</Button>
          )}
          {role === "StoreManager" && (
            <Button color="inherit" component={Link} to="/dashboard/storeManager">Manager</Button>
          )}
          {role && (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;