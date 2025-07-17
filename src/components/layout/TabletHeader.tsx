"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import ic_lock from "@/assets/icons/ic_lock.svg";
import ic_manager from "@/assets/icons/ic_manager.svg";
import ic_profile from "@/assets/icons/ic_profile.svg";
import ic_hamburger_menu from "@/assets/icons/ic_hamburger_menu.svg";
import ic_cart from "@/assets/icons/ic_cart.svg";
import React from "react";

export default function TabletHeader() {
  const pathname = usePathname();

  // 비보호된 페이지 경로 (메인페이지, login, signup) - 비회원도 접근가능
  const unprotectedRoute = pathname === "/" || pathname === "/login" || pathname === "/signup";

  // 보호된 페이지 경로 (main app)
  const isProtectedRoute =
    pathname.startsWith("/products") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/my") ||
    pathname.startsWith("/order") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/budgets") ||
    pathname.startsWith("/users");

  if (unprotectedRoute) {
    return (
      <header className="hidden sm:block md:hidden">
        {/* 헤더 wrapper */}
        <div className="w-full h-25 flex justify-between items-center overflow-hidden px-[24px] py-[32px]">
          {/* 스낵 로고 */}
          <Link href="/" className="relative w-[102.75px] h-[44px]">
            <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
          </Link>

          {/* 로그인 + 기업담당자 회원가입 부분 */}
          <div className="flex items-center gap-10">
            {/* 로그인 */}
            <Link href="/login" className="flex items-center gap-1">
              <div className="relative w-[24px] h-[24px]">
                <Image src={ic_lock} alt="스낵 로고" fill className="object-contain" />
              </div>
              <p className="font-normal text-primary-950">로그인</p>
            </Link>

            {/* 기업담당자 회원가입 */}
            <Link href="/signup/super-admin" className="flex gap-1 items-center">
              <div className="relative w-[24px] h-[24px]">
                <Image src={ic_manager} alt="스낵 로고" fill className="object-contain" />
              </div>
              <p className="font-normal text-primary-950">기업 담당자 회원가입</p>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  if (isProtectedRoute) {
    return (
      <header className="hidden sm:block md:hidden">
        {/* 헤더 wrapper */}
        <div className="w-full h-25 flex justify-between items-center overflow-hidden px-[24px] py-[28px]">
          {/* 스낵 로고 */}
          <div className="relative w-[102.75px] h-[44px]">
            <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
          </div>

          {/* (장바구니, 프로파일, 로그아웃) (메뉴) */}
          <div className="flex items-center gap-10">
            <div className="flex items-center">
              {/* 장바구니 */}
              <div className="flex items-center gap-1">
                <div className="relative w-[24px] h-[24px]">
                  <Image src={ic_cart} alt="장바구니" fill className="object-contain" />
                </div>
              </div>
              {/* 프로필 */}
              <div className="flex gap-1 mx-5 items-center">
                <div className="relative w-[24px] h-[24px]">
                  <Image src={ic_profile} alt="프로필" fill className="object-contain" />
                </div>
              </div>

              {/* 로그아웃 */}
              <div className="flex gap-1 ml-5 items-center">
                <p className="font-normal text-primary-950">로그아웃</p>
              </div>
            </div>

            {/* 메뉴 */}
            <div className="relative w-6 h-6">
              <Image src={ic_hamburger_menu} alt="메뉴" fill className="object-contain" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
