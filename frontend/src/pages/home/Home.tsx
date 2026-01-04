import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../../assets/inventra-logo.jpg";
import bgImage from "../../assets/home_bg1.jpg"; // change required

const Home = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (role === "Admin") navigate("/dashboard/admin");
    else if (role === "StoreManager") navigate("/dashboard/storeManager");
    else if (role === "StoreStaff") navigate("/dashboard/storeStaff");
    else if (role === "Cashier") navigate("/dashboard/storeCashier");
  }, [role, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        position: "relative",
        overflow: "hidden",

        backgroundImage: isDark
          ? `
            linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)),
            url(${bgImage})
          `
          : `
            linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.25)),
            url(${bgImage})
          `,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        filter: isDark
          ? "none"
          : "brightness(1.12) contrast(1.2) saturate(1.15)",

        transition: "all 0.6s ease",

        boxShadow: isDark
          ? "inset 0 0 120px rgba(0,0,0,0.7)"
          : "inset 0 0 90px rgba(0,0,0,0.35)",
      }}
    >
      {/* 🔵 Animated Logo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 30px rgba(100, 181, 246, 0.6)",
        }}
        style={{
          borderRadius: "50%",
          padding: "6px",
          background: isDark
            ? "linear-gradient(135deg, #7e57c2, #512da8)"
            : "linear-gradient(135deg, #7e57c2, #2196f3)",
          display: "inline-block",
          boxShadow: "0px 5px 25px rgba(33, 150, 243, 0.4)",
          marginBottom: "30px",
        }}
      >
        <img
          src={logo}
          alt="Inventra Logo"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "#fff",
          }}
        />
      </motion.div>

      {/* 🔤 Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {/* 🌾 Beige Text */}
          <span
            style={{
              color: "#E8DDC8",
              textShadow: "0 1px 4px rgba(0,0,0,0.45)",
            }}
          >
            Welcome to
          </span>

          {/* 🌈 Gradient Brand */}
          <span
            style={{
              background:
                "linear-gradient(135deg, #64ffda, #82b1ff, #b388ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 14px rgba(0,0,0,0.7)",
            }}
          >
            Inventra
          </span>

          {/* 🛒 Animated Cart */}
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ display: "inline-block" }}
          >
            🛒
          </motion.span>
        </Typography>

        {/* 🌬️ Subtitle with Shadowy Background */}
        <Box
          sx={{
            display: "inline-block",
            px: 3,
            py: 1.2,
            mt: 1,
            mb: 4,
            borderRadius: "14px",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(6px)",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.45), inset 0 0 12px rgba(255,255,255,0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              background: "linear-gradient(90deg, #69f0ae, #40c4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.4px",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            Manage products, suppliers, and stores with ease.
          </Typography>
        </Box>
      </motion.div>

      {/* 🔘 Buttons */}
      <Box display="flex" gap={2}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="/login"
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(33, 150, 243, 0.7)",
              },
            }}
          >
            Login
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="success"
            component="a"
            href="/register"
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(76, 175, 80, 0.7)",
              },
            }}
          >
            Register Your Business Now
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;
