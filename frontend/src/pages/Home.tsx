import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #e2f1fdff, #a9d5f9ff)",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to Shop Inventory System 🛒
      </Typography>

      <Typography variant="h6" color="text.secondary" mb={4}>
        Manage products, suppliers, and stores with ease.
      </Typography>

      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/register"
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
