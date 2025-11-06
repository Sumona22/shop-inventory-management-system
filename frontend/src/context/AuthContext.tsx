// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";import type { AuthContextType, LoginPayload, User } from "../types/auth";
import { loginAPI } from "../api/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (payload: LoginPayload) => {
    const res = await loginAPI(payload);

    // Store token
    localStorage.setItem("token", res.token);

    // Normalize backend response
    setUser({
      id: res.id,
      Role: res.Role,
      name: res.name || "",
      email: res.email || "",
    });

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
