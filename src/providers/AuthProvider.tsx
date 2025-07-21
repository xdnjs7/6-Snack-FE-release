"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserApi } from "@/lib/api/user.api";
import { loginApi, logoutApi, registerApi } from "@/lib/api/auth.api";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const userData = await getUserApi();
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await registerApi(name, email, password);
  };

  const login = async (email: string, password: string) => {
    const userData = await loginApi(email, password);
    setUser(userData);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  // eslint-disable-next-line no-unused-vars
  const updateUser = async (_userData: Partial<User>) => {
    // const updatedUser = await updateUserApi(userData);
    // setUser(updatedUser);
    // updateUserApi가 구현되어 있지 않으므로 임시로 아무 동작도 하지 않음
  };

  useEffect(() => {
    getUser();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>{children}</AuthContext.Provider>;
}
