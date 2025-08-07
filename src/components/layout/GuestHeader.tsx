"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ic_lock from "@/assets/icons/ic_lock.svg";
import img_logo from "@/assets/images/img_logo.webp";
import { usePathname, useRouter } from "next/navigation";
import { TSideMenuItem } from "@/types/sideMenu.types";
import HamburgerMenuIconSvg from "../svg/HamburgerMenuIconSvg";
import SideMenu from "../common/SideMenu";

export default function GuestHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { id: "login", label: "로그인", href: "/login" },
    { id: "super-admin-signup", label: "기업 담당자 회원가입", href: "/signup/super-admin" },
  ];

  // 햄버거 메뉴버튼 클릭 핸들러
  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  // 사이드바 메뉴에서 nav 선택시 핸들러
  const handleItemClick = (item: TSideMenuItem) => {
    if (item.href) {
      router.push(item.href);
      setIsMenuOpen(false);
    }
  };
  return (
    <header className="w-full h-14 sm:h-25 md:h-[90px] sm:px-[24px] sm:py-[32px] md:px-[100px] flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px] bg-white/90 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] ">
      <Link href="/">
        <div className="relative w-[102.75px] h-[44px]">
          <Image src={img_logo} fill alt="스낵 로고" className="object-contain" />
        </div>
      </Link>
      <HamburgerMenuIconSvg className="sm:hidden text-primary-400" onClick={handleMenuClick} />

      <SideMenu
        items={menuItems}
        isOpen={isMenuOpen}
        currentPath={pathname}
        onItemClick={handleItemClick}
        onClose={() => setIsMenuOpen(false)}
      />

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
            {/* <div className="relative w-[24px] h-[24px]">
              <Image src={ic_manager} alt="스낵 로고" fill className="object-contain" />
            </div> */}
            <p className="font-normal text-primary-950">기업 담당자 회원가입</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
