"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserApi } from "@/lib/api/user.api";
import { loginApi, logoutApi, registerApi } from "@/lib/api/auth.api";
import { usePathname, useRouter } from "next/navigation";
import { TUser, TAuthContextType } from "@/types/auth.types";

const AuthContext = createContext<TAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const getUser = async () => {
    try {
      const userData = await getUserApi();
      setUser(userData);
    } catch (error) {
      console.log("유저 정보 조회 실패:", error);
      setUser(null);
    }
  };

  const register = async () => {
    await registerApi();
  };

  const login = async (email: string, password: string) => {
    const userData = await loginApi(email, password);
    setUser(userData);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    // 예외 경로: 홈(랜딩)페이지와 /auth 하위 경로들
    if (
      pathname === "/" ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup")
    )
      return;

    console.log("🔍 인증 상태 확인:", pathname);
    getUser();
  }, [pathname]);

  // 앱 초기 로드시에도 인증 상태 확인
  useEffect(() => {
    // 예외 경로가 아닌 경우에만 초기 인증 상태 확인
    const currentPath = pathname;
    if (
      currentPath !== "/" &&
      !currentPath.startsWith("/auth") &&
      !currentPath.startsWith("/login") &&
      !currentPath.startsWith("/signup")
    ) {
      console.log("🚀 앱 초기 로드: 인증 상태 확인 시작");
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 한 번만 실행

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
}
