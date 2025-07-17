"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import ic_lock from "@/assets/icons/ic_lock.svg";
import ic_manager from "@/assets/icons/ic_manager.svg";
import ic_cart from "@/assets/icons/ic_cart.svg";
import ic_profile from "@/assets/icons/ic_profile.svg";
import ic_like_normal from "@/assets/icons/ic_like_normal.svg";

export default function DesktopHeader() {
  const pathname = usePathname();

  // 비보호된 페이지 경로 (메인페이지, login, signup) - 비회원도 접근가능
  const unprotectedRoute = pathname === "/" || pathname === "/login" || pathname === "/signup";

  // 개발용 임시경로 - 개발완료후 삭제예정
  const isPreviewRoute = pathname === "/components-preview";

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
      <header className="hidden md:block">
        {/* 헤더 wrapper */}
        <div className="w-full h-[90px] flex justify-between items-center overflow-hidden px-[100px] py-[32px]">
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
      <header className="hidden md:block">
        {/* 헤더 wrapper */}
        <div className="w-full h-[90px] flex justify-between items-center overflow-hidden px-[100px] py-[32px]">
          {/* (스낵 로고 + nav bar) wrapper */}
          <div className="flex gap-10">
            {/* 스낵 로고 */}
            <div className="relative w-[102.75px] h-[44px]">
              <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
            </div>
            {/* nav - 상품 리스트, 구매요청내역, 상품등록내역, 구매요청관리, 구매내역확인, 관리  */}
            <nav className="flex items-center gap-[30px]">
              <div className="px-2.5">
                <p className="font-normal text-primary-950">상품 리스트</p>
              </div>
              <div className="px-2.5">
                <p className="font-normal text-primary-950">구매 요청 내역</p>
              </div>
              <div className="px-2.5">
                <p className="font-normal text-primary-950">상품 등록 내역</p>
              </div>
              <div className="px-2.5">
                <p className="font-normal text-primary-950">구매 요청 관리</p>
              </div>
              <div className="px-2.5">
                <p className="font-normal text-primary-950">구매 내역 확인</p>
              </div>
              <div className="px-2.5">
                <p className="font-normal text-primary-950">관리</p>
              </div>
            </nav>
          </div>

          {/* 찜목록, 장바구니, 프로필아이콘, 로그아웃 */}
          <div className="flex items-center">
            {/* 찜목록 */}
            <div className="flex items-center gap-0.5 mr-7.5 ">
              <div className="relative w-[24px] h-[24px]">
                <Image src={ic_like_normal} alt="찜목록" fill className="object-contain" />
              </div>
              <p className="font-normal">찜목록</p>
            </div>
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
        </div>
      </header>
    );
  }

  // 임시 개발용 - 개발 완료후 삭제예정
  if (isPreviewRoute) {
    return (
      <div>
        <h2>비회원에게 허용된 루트에서 보이는 헤더</h2>
        <header className="hidden md:block">
          {/* 헤더 wrapper */}
          <div className="w-full h-[90px] flex justify-between items-center overflow-hidden px-[100px] py-[32px]">
            {/* 스낵 로고 */}
            <div className="relative w-[102.75px] h-[44px]">
              <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
            </div>

            {/* 로그인 + 기업담당자 회원가입 부분 */}
            <div className="flex items-center gap-10">
              {/* 로그인 */}
              <div className="flex items-center gap-1">
                <div className="relative w-[24px] h-[24px]">
                  <Image src={ic_lock} alt="스낵 로고" fill className="object-contain" />
                </div>
                <p className="font-normal text-primary-950">로그인</p>
              </div>

              {/* 기업담당자 회원가입 */}
              <div className="flex gap-1 items-center">
                <div className="relative w-[24px] h-[24px]">
                  <Image src={ic_manager} alt="스낵 로고" fill className="object-contain" />
                </div>
                <p className="font-normal text-primary-950">기업 담당자 회원가입</p>
              </div>
            </div>
          </div>
        </header>
        <h2>보호된 루트에서 보이는 헤더 (로그인한 유저)</h2>
        <header className="hidden md:block">
          {/* 헤더 wrapper */}
          <div className="w-full h-[90px] flex justify-between items-center overflow-hidden px-[100px] py-[32px]">
            {/* (스낵 로고 + nav bar) wrapper */}
            <div className="flex gap-10">
              {/* 스낵 로고 */}
              <div className="relative w-[102.75px] h-[44px]">
                <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
              </div>
              {/* nav - 상품 리스트, 구매요청내역, 상품등록내역, 구매요청관리, 구매내역확인, 관리  */}
              <nav className="flex items-center gap-[30px]">
                <div className="px-2.5">
                  <p className="font-normal text-primary-950">상품 리스트</p>
                </div>
                <div className="px-2.5">
                  <p className="font-normal text-primary-950">구매 요청 내역</p>
                </div>
                <div className="px-2.5">
                  <p className="font-normal text-primary-950">상품 등록 내역</p>
                </div>
                <div className="px-2.5">
                  <p className="font-normal text-primary-950">구매 요청 관리</p>
                </div>
                <div className="px-2.5">
                  <p className="font-normal text-primary-950">구매 내역 확인</p>
                </div>
                <div className="px-2.5">
                  <p className="font-normal text-primary-950">관리</p>
                </div>
              </nav>
            </div>

            {/* 찜목록, 장바구니, 프로필아이콘, 로그아웃 */}
            <div className="flex items-center">
              {/* 찜목록 */}
              <div className="flex items-center gap-0.5 mr-7.5 ">
                <div className="relative w-[24px] h-[24px]">
                  <Image src={ic_like_normal} alt="찜목록" fill className="object-contain" />
                </div>
                <p className="font-normal">찜목록</p>
              </div>
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
          </div>
        </header>
      </div>
    );
  }
}
