"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import ic_hamburger_menu from "@/assets/icons/ic_hamburger_menu.svg";
import ic_chevron_down from "@/assets/icons/ic_chevron_down.svg";
import ic_cart from "@/assets/icons/ic_cart.svg";

export default function MobileHeader() {
  const pathname = usePathname();

  // 비보호된 페이지 경로 (랜딩 페이지) - 비회원도 접근가능
  const isUnprotectedRoute = pathname === "/";
  // 유저
  const isAuthRoute = pathname === "/login" || pathname === "/signup";

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
    return (
      <header className="block sm:hidden">
        <div className="w-full h-14 flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px]">
          <Link href="/" className="relative w-[102.75px] h-[44px]">
            <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
          </Link>
          <div className="relative w-6 h-6">
            <Image src={ic_hamburger_menu} alt="메뉴" fill className="object-contain" />
          </div>
        </div>
      </header>
    );
  }

  if (isProtectedRoute) {
    return (
      <header className="block sm:hidden">
        <div className="w-full h-14 flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px]">
          <div className="relative w-[102.75px] h-[44px]">
            <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
          </div>

          {/* 카테고리 dropdown 버튼 */}
          <div className="flex gap-1 items-center">
            <p className="font-bold">음료</p>
            <div className="relative w-[20px] h-[20px]">
              <Image src={ic_chevron_down} alt="아래 화살표" fill className="object-contain brightness-0 opacity-40" />
            </div>
          </div>

          {/* 장바구니 + 메뉴 영역 */}
          <div className="flex gap-5 items-center">
            <div className="relative w-[24px] h-[24px]">
              <Image src={ic_cart} alt="장바구니" fill className="object-contain" />
            </div>
            <div className="relative w-6 h-6">
              <Image src={ic_hamburger_menu} alt="메뉴" fill className="object-contain" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
