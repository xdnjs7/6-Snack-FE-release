"use client";

import React from "react";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import ic_hamburger_menu from "@/assets/icons/ic_hamburger_menu.svg";
import ic_chevron_down from "@/assets/icons/ic_chevron_down.svg";
import ic_cart from "@/assets/icons/ic_cart.svg";
import ProfileAvatar from "../common/ProfileAvatar";
import VerticalBarIconSvg from "../svg/VerticalBarIconSvg";

export default function AuthenticatedHeader() {
  return (
    <header className="w-full h-14 sm:h-25 md:h-[90px] flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px] sm:px-[24px] sm:py-[28px] md:px-[100px] md:py-[32px]">
      <div className="flex items-center justify-center md:gap-10">
        <div className="relative w-[102.75px] h-[44px]">
          <Image src={img_logo} alt="스낵 로고" fill className="object-contain" />
        </div>
        {/* nav - 상품 리스트, 구매요청내역, 상품등록내역, 구매요청관리, 구매내역확인, 관리  */}
        <div className="hidden md:block">
          <nav className="flex items-center justify-center gap-[30px]">
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
      </div>

      {/* 카테고리 dropdown 버튼 */}
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
        <div className="flex items-center sm:gap-5">
          <div className="relative w-[24px] h-[24px]">
            <Image src={ic_cart} alt="장바구니" fill className="object-contain" />
          </div>

          <div className="hidden sm:block">
            <ProfileAvatar label="김" />
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
