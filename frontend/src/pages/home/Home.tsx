import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

import logo from "../../assets/inventra-logo.jpg";
import bgImage from "../../assets/home_bg1.jpg";

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
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        position: "relative",

        /* ✅ PERFECTLY BALANCED OVERLAY */
        backgroundImage: `
          linear-gradient(
            ${
              isDark
                ? "rgba(10, 25, 47, 0.78), rgba(10, 25, 47, 0.88)"
                : "rgba(30, 41, 59, 0.35), rgba(30, 41, 59, 0.45)"
            }
          ),
          url(${bgImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        /* ✅ Slight professional tuning */
        filter: isDark
          ? "saturate(0.95) brightness(1)"
          : "saturate(1) brightness(0.95)",
      }}
    >
      {/* ================= CONTENT ================= */}
      <Box maxWidth="900px">
        {/* ================= LOGO ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            marginBottom: "28px",
            display: "inline-block",
            padding: "10px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(100,181,246,0.6), rgba(179,136,255,0.6))",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 40px rgba(100,181,246,0.35)",
          }}
        >
          <img
            src={logo}
            alt="Inventra Logo"
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "#fff",
              objectFit: "contain",
              padding: 10,
            }}
          />
        </motion.div>

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              color: "#E3F2FD",
              mb: 1,
              letterSpacing: "0.5px",
            }}
          >
            Welcome to{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #64ffda, #82b1ff, #b388ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Inventra
            </span>
          </Typography>

          {/* ================= SUBTITLE ================= */}
          <Box
            sx={{
              display: "inline-block",
              px: 3,
              py: 1.2,
              mt: 2,
              mb: 5,
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#B3E5FC",
                fontWeight: 500,
              }}
            >
              Smart inventory & order management for modern businesses
            </Typography>
          </Box>
        </motion.div>

        {/* ================= CTA BUTTONS ================= */}
        <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Button
              variant="contained"
              size="large"
              component="a"
              href="/login"
              sx={{
                px: 5,
                py: 1.4,
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #2196f3, #21cbf3)",
                boxShadow: "0 10px 30px rgba(33,150,243,0.45)",
              }}
            >
              Login
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Button
              variant="outlined"
              size="large"
              component="a"
              href="/register"
              sx={{
                px: 5,
                py: 1.4,
                fontWeight: 700,
                color: "#A5D6A7",
                borderColor: "#A5D6A7",
                "&:hover": {
                  backgroundColor: "rgba(165,214,167,0.12)",
                  borderColor: "#81C784",
                },
              }}
            >
              Register Your Business
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
