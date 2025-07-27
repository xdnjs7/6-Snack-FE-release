"use client";

import React, { useState } from "react";
import Image from "next/image";
import ic_cart from "@/assets/icons/ic_cart.svg";
import ProfileAvatar from "../common/ProfileAvatar";
import VerticalBarIconSvg from "../svg/VerticalBarIconSvg";
import Link from "next/link";
import SnackIconSvg from "../svg/SnackIconSvg";
import LikeIconSvg from "../svg/LikeIconSvg";
import HamburgerMenuIconSvg from "../svg/HamburgerMenuIconSvg";
import SideMenu from "../common/SideMenu";
import MobileCategoryMenu from "../common/MobileCategoryMenu";
import { usePathname } from "next/navigation";
import { TSideMenuItem } from "@/types/sideMenu.types";
import { useRouter } from "next/navigation";
import ArrowIconSvg from "../svg/ArrowIconSvg";
import { TCategoryItem } from "@/types/subCategoryMenu.types";
import { useCategoryStore } from "@/stores/categoryStore";
import { CATEGORIES } from "@/lib/utils/categories.util";

export default function AuthenticatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 전역 카테고리 상태 사용
  const { selectedCategory } = useCategoryStore();

  const menuItems = [
    { id: "products", label: "상품 리스트", href: "/products" },
    { id: "my-order-list", label: "구매 요청 내역", href: "/my/order-list" },
    { id: "my-products", label: "상품 등록 내역", href: "/my/products" },
    // 관리자
    { id: "order-manage", label: "구매 요청 관리", href: "/order-manage" },
    { id: "order-history", label: "구매 내역 확인", href: "/order-history" },
    // 최고 관리자
    { id: "manage-users", label: "관리", href: "/manage/users" },
    { id: "profile", label: "마이 페이지", href: "/profile" },
  ];

  // 햄버거 메뉴버튼 클릭 핸들러
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 카테고리 메뉴 토글 핸들러
  const handleCategoryMenuClick = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  // 사이드바 메뉴에서 nav 선택시 핸들러
  const handleItemClick = (item: TSideMenuItem) => {
    if (item.href) {
      router.push(item.href);
      setIsMenuOpen(false);
    }
  };

  // 카테고리 아이템 클릭 핸들러
  const handleCategoryItemClick = (item: TCategoryItem) => {
    setIsCategoryMenuOpen(false);
    // 여기에 category별 product 검색결과 보여주기
    router.push(`/products?category=${item.id}`);
  };

  // 현재 선택된 카테고리 이름 표시 (전역 상태에서 가져옴)
  const currentCategoryName = selectedCategory?.parent || "전체";
  return (
    <header className="w-full h-14 sm:h-25 md:h-[90px] flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px] sm:px-[24px] sm:py-[28px] md:px-[100px] md:py-[32px] bg-white/90 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] backdrop-blur-lg relative z-[10000]">
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
            <Link href="/manage/users" className="px-2.5">
              <p className="font-normal text-primary-950">관리</p>
            </Link>
          </nav>
        </div>
      </div>

      {/* 카테고리 dropdown 버튼 - mobile  */}
      <div className="block sm:hidden">
        <button
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleCategoryMenuClick}
          aria-expanded={isCategoryMenuOpen}
          aria-haspopup="true"
        >
          <p className="font-bold">{currentCategoryName}</p>
          <ArrowIconSvg direction={isCategoryMenuOpen ? "up" : "down"} className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* 장바구니 + 메뉴 영역 */}
      <div className="flex items-center gap-5 sm:gap-10 md:gap-7.5">
        <div className="hidden md:block">
          <Link href="/wishlist">
            <div className="flex items-center justify-center p-1 gap-0.5">
              <LikeIconSvg className="pointer-events-none" />
              <p className="text-primary-950 text-sm/[17px] tracking-tight">찜목록</p>
            </div>
          </Link>
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
        {/* 여기에 menu 누를시 SideMenu 화면 옆에 나오도록 */}
        <HamburgerMenuIconSvg className="md:hidden text-primary-400" onClick={handleMenuClick} />

        <SideMenu
          items={menuItems}
          isOpen={isMenuOpen}
          currentPath={pathname}
          onItemClick={handleItemClick}
          onClose={() => setIsMenuOpen(false)}
          className=""
        />

        {/* 상품 상세 페이지, 상품 리스트 페이지에서만 모바일버전에서 보임 */}
        <MobileCategoryMenu
          items={CATEGORIES.parentCategory}
          isOpen={isCategoryMenuOpen}
          currentCategory={selectedCategory?.id?.toString()}
          onItemClick={handleCategoryItemClick}
          onClose={() => setIsCategoryMenuOpen(false)}
        />
      </div>
    </header>
  );
}
