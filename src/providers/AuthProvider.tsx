"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

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

  // 환경변수에서 API URL을 가져오거나 기본값 사용
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  
  const getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        credentials: "include", // 쿠키를 보내기 위해 필요
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // 일반 회원가입은 초대 링크가 필요하므로 여기서는 처리하지 않음
    console.log("Register attempt:", { name, email, password });
    throw new Error("일반 회원가입은 초대 링크가 필요합니다");
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // 쿠키를 받기 위해 필요
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "로그인에 실패했습니다");
    }

    const result = await response.json();
    console.log("AuthProvider login result:", result);

    // 백엔드 응답 구조에 맞춰 사용자 정보 설정
    if (result.user) {
      setUser(result.user);
    } else {
      setUser(result);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("로그아웃 오류:", error);
    } finally {
      setUser(null);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("사용자 정보 업데이트에 실패했습니다");
    }

    const updatedUser = await response.json();
    setUser(updatedUser);
  };

  useEffect(() => {
    // 웹페이지 랜딩 또는 새로고침 시 마다 서버에서 유저 데이터 동기화
    getUser();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>{children}</AuthContext.Provider>;
}
