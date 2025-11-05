// src/types/auth.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "storeManager" | "storeStaff" | "storeCashier"; 
}

export interface AuthContextType {
  user: User | null; // current logged-in user or null if not logged in
  login: (email: string, password: string) => Promise<void> | void; 
  logout: () => void; 
  isAuthenticated: boolean; // true if logged in, false otherwise
}
