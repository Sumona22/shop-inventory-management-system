import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface NavBarProps {
  toggleMode: () => void;
  mode: "light" | "dark";
}

const NavBar: React.FC<NavBarProps> = ({ toggleMode, mode }) => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🏪 Inventra
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {role === "Admin" && (
            <Button color="inherit" component={Link} to="/dashboard/admin">
              Admin
            </Button>
          )}
          {role === "StoreManager" && (
            <Button
              color="inherit"
              component={Link}
              to="/dashboard/storeManager"
            >
              Manager
            </Button>
          )}
          {role && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
