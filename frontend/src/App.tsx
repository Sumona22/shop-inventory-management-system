import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";

interface AppProps {
  toggleMode: () => void;
  mode: "light" | "dark";
}

const App: React.FC<AppProps> = ({ toggleMode, mode }) => {
  return (
    <AuthProvider>
      <Router>
        <NavBar toggleMode={toggleMode} mode={mode} />
        <AppRouter />
      </Router>
    </AuthProvider>
  );
};

export default App;
