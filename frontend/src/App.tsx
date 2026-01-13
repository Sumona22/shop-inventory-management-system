import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationProvider } from "./context/NotificationContext";

interface AppProps {
  toggleMode: () => void;
  mode: "light" | "dark";
}

const App: React.FC<AppProps> = ({ toggleMode, mode }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          {/* 🔔 Toasts (GLOBAL) */}
          <ToastContainer position="top-right" autoClose={4000} />

          <NavBar toggleMode={toggleMode} mode={mode} />
          <AppRouter />
        </Router>
      </NotificationProvider>
    </AuthProvider>

  );
};

export default App;
