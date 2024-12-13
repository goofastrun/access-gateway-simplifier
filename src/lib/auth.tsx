import React, { createContext, useContext, useState } from "react";
import { User } from "./types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Temporary mock storage
const users: User[] = [];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log("Attempting login with:", { email, password });
    
    const foundUser = users.find(u => u.email === email);
    if (!foundUser) {
      throw new Error("User not found");
    }
    
    setUser(foundUser);
    console.log("Login successful:", foundUser);
  };

  const register = async (userData: Omit<User, "id"> & { password: string }) => {
    console.log("Attempting registration with:", userData);
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error("User already exists");
    }

    // Create new user with generated ID
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9)
    };

    // Add to mock storage
    users.push(newUser);
    
    // Auto-login after registration
    setUser(newUser);
    
    console.log("Registration successful:", newUser);
  };

  const logout = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};