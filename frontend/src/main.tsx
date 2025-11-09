import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const Root = () => {
  // Load saved mode or default to light
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("themeMode") as "light" | "dark") || "light"
  );

  // Create MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f9f9f9", paper: "#ffffff" },
                text: { primary: "#000000" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#ffffff" },
              }),
        },
      }),
    [mode]
  );

  // Persist theme in localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleMode={toggleMode} mode={mode} />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
