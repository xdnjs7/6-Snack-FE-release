"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TChildrenProps } from "@/types/children.types";
// import { getUserApi } from "@/lib/api/user.api";

// User 타입 정의
type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  cartItemCount: number;
  company: {
    id: number;
    name: string;
  };
};

// AuthContext 타입 정의
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, name: string, password: string, passwordConfirm: string) => Promise<void>;
  getUser: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
};

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: TChildrenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 가져오기
  const getUser = async () => {
    try {
      setIsLoading(true);
      // TODO: 실제 API 호출로 교체
      // const { data: userData } = await getUserApi();
      // setUser(userData);

      // 임시 사용자 데이터 (API 연동 전까지)
      const mockUser: User = {
        id: "user-123",
        email: "test@example.com",
        name: "김코드",
        role: "user",
        cartItemCount: 0,
        company: {
          id: 1,
          name: "테스트 회사",
        },
      };
      setUser(mockUser);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 함수
  const signUp = async (_email: string, _name: string, _password: string, _passwordConfirm: string) => {
    // TODO: 실제 회원가입 API 호출
    // await signUpApi(inviteId, password, passwordConfirm);
    // inviteId는 params에 있음?
    await getUser();
  };

  // 로그인 함수
  const login = async (email: string, _password: string) => {
    try {
      setIsLoading(true);
      // TODO: 실제 로그인 API 호출
      // await loginApi({ email, password });
      // await getUser(); // 로그인 후 사용자 정보 다시 가져오기

      // 임시 로그인 로직
      const mockUser: User = {
        id: "user-123",
        email,
        name: "김철수",
        role: "user", // "user", "admin", "super_admin"
        cartItemCount: 0,
        company: {
          id: 1,
          name: "테스트 회사",
        },
      };

      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    // TODO: 실제 로그아웃 API 호출
    // await logoutApi();
    setUser(null);
  };

  // 사용자 정보 새로고침
  const refreshUser = async () => {
    try {
      await getUser();
      return user;
    } catch (error) {
      console.error("사용자 정보 새로고침 실패:", error);
      return null;
    }
  };

  // 초기 로드 시 사용자 정보 확인
  useEffect(() => {
    getUser();
  }, []);

  const value = {
    user,
    isLoading,
    login,
    logout,
    signUp,
    getUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
