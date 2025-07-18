"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import ic_hamburger_menu from "@/assets/icons/ic_hamburger_menu.svg";
import ic_lock from "@/assets/icons/ic_lock.svg";
import ic_manager from "@/assets/icons/ic_manager.svg";
import SnackIconSvg from "../svg/SnackIconSvg";

export default function GuestHeader() {
  return (
    <header className="w-full h-14 sm:h-25 md:h-[90px] sm:px-[24px] sm:py-[32px] md:px-[100px] flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px] bg-white/90 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] backdrop-blur-lg">
      <Link href="/">
        <SnackIconSvg className="w-[102.75px] h-[44px]" />
      </Link>
      <div className="sm:hidden relative w-6 h-6">
        <Image src={ic_hamburger_menu} alt="메뉴" fill className="object-contain" />
      </div>
      {/* tablet */}
      {/* 로그인 + 기업담당자 회원가입 부분 */}
      <div className="hidden sm:block">
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
