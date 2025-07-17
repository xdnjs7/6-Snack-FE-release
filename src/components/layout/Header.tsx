"use client";

import React from "react";
import { usePathname } from "next/navigation";
import GuestHeader from "./GuestHeader";
import AuthenticatedHeader from "./AuthenticatedHeader";

export default function Header() {
  const pathname = usePathname();

  // 비보호된 페이지 경로 (랜딩 페이지) - 비회원도 접근가능, **/components-preview는 개발 후 지우기 **
  const isUnprotectedRoute = pathname === "/" || pathname.startsWith("/components-preview");
  // 유저
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  // 보호된 페이지 경로 (main app)
  const isProtectedRoute =
    pathname.startsWith("/products") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/my") ||
    pathname.startsWith("/order") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/budgets") ||
    pathname.startsWith("/users");

  if (isAuthRoute) {
    return null;
  }

  if (isUnprotectedRoute) {
    return <GuestHeader />;
  }

  if (isProtectedRoute) {
    return <AuthenticatedHeader />;
  }

  return null;
}
