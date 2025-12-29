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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#0a2540", // Deep Navy
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
              "&:hover": {
                backgroundColor: "#1e40af",
              },
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
                "&:hover": {
                  backgroundColor: "#1e40af",
                },
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
                "&:hover": {
                  backgroundColor: "#1e40af",
                },
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
                "&:hover": {
                  backgroundColor: "#b91c1c",
                },
              }}
            >
              Logout
            </Button>
          )}

          {/* Theme Toggle */}
          <IconButton
            sx={{
              ml: 1,
              color: "#ffffff",
              backgroundColor: "#1e3a8a",
              "&:hover": {
                backgroundColor: "#1e40af",
              },
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
