// src/types/auth.ts

export type Role = "Admin" | "StoreManager" | "StoreStaff" | "Cashier";

export interface User {
  id: string;
  name?: string;
  email?: string;
  Role: Role; // ✅ match backend capitalization
}

export interface LoginPayload {
  Role: Role; // ✅ backend expects capital R
  Business_ID?: string;
  Branch_ID?: string;
  Personal_ID?: string;
  Password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
