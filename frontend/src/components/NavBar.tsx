import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🏪 Shop Inventory Management
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
