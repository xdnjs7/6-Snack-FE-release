"use client";

import React from "react";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import ic_hamburger_menu from "@/assets/icons/ic_hamburger_menu.svg";
import ic_chevron_down from "@/assets/icons/ic_chevron_down.svg";
import ic_cart from "@/assets/icons/ic_cart.svg";
import ProfileAvatar from "../common/ProfileAvatar";
import VerticalBarIconSvg from "../svg/VerticalBarIconSvg";
import Link from "next/link";
import SnackIconSvg from "../svg/SnackIconSvg";
import LikeIconSvg from "../svg/LikeIconSvg";

export default function AuthenticatedHeader() {
  return (
    <header className="w-full h-14 sm:h-25 md:h-[90px] flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px] sm:px-[24px] sm:py-[28px] md:px-[100px] md:py-[32px]">
      <div className="flex items-center justify-center md:gap-10">
        <Link href="/">
          <SnackIconSvg className="w-[102.75px] h-[44px]" />
        </Link>
        {/* nav - 상품 리스트, 구매요청내역, 상품등록내역, 구매요청관리, 구매내역확인, 관리  */}
        <div className="hidden md:block">
          <nav className="flex items-center justify-center gap-[30px]">
            <Link href="/products" className="px-2.5">
              <p className="font-normal text-primary-950">상품 리스트</p>
            </Link>
            <Link href="/my/order-list" className="px-2.5">
              <p className="font-normal text-primary-950">구매 요청 내역</p>
            </Link>
            <Link href="my/products/registered" className="px-2.5">
              <p className="font-normal text-primary-950">상품 등록 내역</p>
            </Link>

            {/* 관리자에게만 보임 - AuthProvider 사용하여 분기처리 예정 */}
            <Link href="/order-manage" className="px-2.5">
              <p className="font-normal text-primary-950">구매 요청 관리</p>
            </Link>
            <Link href="/order-history" className="px-2.5">
              <p className="font-normal text-primary-950">구매 내역 확인</p>
            </Link>

            {/* 최고관리자에게만 보임 - AuthProvider 사용하여 분기처리 예정 */}
            <Link href="/" className="px-2.5">
              <p className="font-normal text-primary-950">관리</p>
            </Link>
          </nav>
        </div>
      </div>

      {/* 카테고리 dropdown 버튼 - mobile  */}
      <div className="block sm:hidden">
        <div className="flex gap-1 items-center">
          <p className="font-bold">음료</p>
          <div className="relative w-[20px] h-[20px]">
            <Image src={ic_chevron_down} alt="아래 화살표" fill className="object-contain brightness-0 opacity-40" />
          </div>
        </div>
      </div>

      {/* 장바구니 + 메뉴 영역 */}
      <div className="flex items-center gap-5 sm:gap-10 md:gap-7.5">
        <div className="hidden md:block">
          <div className="flex p-1 gap-0.5">
            <LikeIconSvg />
            <p className="text-sm/[17px] tracking-tight">찜목록</p>
          </div>
        </div>
        <div className="flex items-center sm:gap-5">
          <Link href="/cart">
            <div className="relative w-[24px] h-[24px]">
              <Image src={ic_cart} alt="장바구니" fill className="object-contain" />
            </div>
          </Link>

          <div className="hidden sm:block">
            {/* AuthProvider 사용하여 로그인한 User의 name 가져와서 index 0값을 string으로 넣을 예정 */}
            <Link href="/profile">
              <ProfileAvatar label="김" />
            </Link>
          </div>
          <VerticalBarIconSvg className="hidden sm:block text-primary-100" />
          <p className="hidden sm:block font-normal text-primary-950">로그아웃</p>
        </div>
        <div className="relative w-6 h-6">
          <Image src={ic_hamburger_menu} alt="메뉴" fill className="object-contain" />
        </div>
      </div>
    </header>
  );
}
