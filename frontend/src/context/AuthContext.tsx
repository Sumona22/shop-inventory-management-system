// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  role: string | null;
  token: string | null;
  login: (role: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newRole: string, newToken: string) => {
    setRole(newRole);
    setToken(newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};