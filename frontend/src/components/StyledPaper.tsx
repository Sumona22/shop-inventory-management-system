// src/components/StyledPaper.tsx
import { Paper, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const BasePaper = styled(Paper)(({ theme }) => ({
  padding: "1.5rem",
  textAlign: "center",
  borderRadius: "16px",
  width: "220px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #1e1e1e, #2c2c2c)"
      : "linear-gradient(135deg, #ffffff, #f6f9fdff)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 15px rgba(246, 247, 248, 0.25)"
      : "0 4px 12px rgba(56, 51, 88, 0.15)",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 20px rgba(246, 247, 248, 0.45)"
        : "0 6px 20px rgba(56, 51, 88, 0.25)",
  },
}));

export default BasePaper;
