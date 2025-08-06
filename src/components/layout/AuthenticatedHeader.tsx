"use client";

import React, { useState } from "react";
import Image from "next/image";
import ic_cart from "@/assets/icons/ic_cart.svg";
import ProfileAvatar from "../common/ProfileAvatar";
import VerticalBarIconSvg from "../svg/VerticalBarIconSvg";
import Link from "next/link";
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
import { CATEGORIES } from "@/lib/constants/categories";
import img_logo from "@/assets/images/img_logo.webp";
import { useAuth } from "@/providers/AuthProvider";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function AuthenticatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 전역 카테고리 상태 사용
  const { selectedCategory, clearSelectedCategory } = useCategoryStore();

  const { user, logout } = useAuth();
  const { isMobile } = useDeviceType();

  // 모든 유저 공통 메뉴
  const commonMenuItems: TSideMenuItem[] = [
    { id: "products", label: "상품 리스트", href: "/products" },
    { id: "my-order-list", label: "구매 요청 내역", href: "/my/order-list" },
    { id: "my-products", label: "상품 등록 내역", href: "/my/products" },
  ];

  // 관리자 메뉴 (ADMIN, SUPER_ADMIN)
  const adminMenuItems = [
    { id: "order-manage", label: "구매 요청 관리", href: "/order-manage" },
    { id: "order-history", label: "구매 내역 확인", href: "/order-history" },
  ];

  // 최고 관리자 메뉴 (SUPER_ADMIN만)
  const superAdminMenuItems = [{ id: "manage-users", label: "관리", href: "/manage/users" }];

  // 공통 메뉴 (nav와 SideMenu 모두에서 사용)
  const getCommonMenuItems = () => {
    let menuItems = [...commonMenuItems];

    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
      menuItems = [...menuItems, ...adminMenuItems];
    }

    if (user?.role === "SUPER_ADMIN") {
      menuItems = [...menuItems, ...superAdminMenuItems];
    }

    return menuItems;
  };

  // SideMenu 전용 메뉴 (찜목록, 마이페이지, 로그아웃 포함)
  const getSideMenuItems = () => {
    const commonItems = getCommonMenuItems();

    commonItems.push({ id: "my-favorites", label: "찜목록", href: "/my/favorites" });

    // 모바일 버전에서만 마이페이지 옵션 보여야함
    if (isMobile) {
      commonItems.push({ id: "profile", label: "마이 페이지", href: "/profile" });
    }

    commonItems.push({ id: "logout", label: "로그아웃", href: "" });

    return commonItems;
  };

  const navItems = getCommonMenuItems();
  const sideMenuItems = getSideMenuItems();

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
    if (item.id === "logout") {
      logout();
      setIsMenuOpen(false);
    } else if (item.href) {
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

  // '전체' 클릭 핸들러
  const handleAllCategoriesClick = () => {
    setIsCategoryMenuOpen(false);
    clearSelectedCategory(); // 전역 상태를 null로 초기화
    router.push("/products"); // category 파라미터 없이 이동
  };

  // 현재 선택된 카테고리 이름 표시 (전역 상태에서 가져옴)
  const currentCategoryName = selectedCategory?.parent || "전체";
  return (
    <header className="sticky top-0 w-full h-14 sm:h-25 md:h-[90px] flex justify-between items-center overflow-hidden pl-[10px] pr-[24px] pt-[16px] pb-[16px] sm:px-[24px] sm:py-[28px] md:px-[100px] md:py-[32px] bg-white/90 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] backdrop-blur-lg z-50">
      <div className="flex items-center justify-center md:gap-10">
        <Link href="/products">
          <div className="relative w-[102.75px] h-[44px]">
            <Image src={img_logo} fill alt="스낵 로고" className="object-contain" />
          </div>
        </Link>
        {/* nav - 상품 리스트, 구매요청내역, 상품등록내역, 구매요청관리, 구매내역확인, 관리  (권한에 따라 다르게 보임) */}
        <div className="hidden md:block">
          <nav className="flex items-center justify-center gap-[30px]">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href || "#"} className="px-2.5">
                <p
                  className={`text-primary-950 tracking-tight text-base/[20px] ${pathname === item.href ? "font-extrabold" : "font-normal"}`}
                >
                  {item.label}
                </p>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 카테고리 dropdown 버튼 - mobile  */}
      <div className="block sm:hidden">
        <button
          className={`flex gap-1 items-center ${
            pathname.startsWith("/products") ? "cursor-pointer" : "cursor-default opacity-0 pointer-events-none"
          }`}
          onClick={pathname.startsWith("/products") ? handleCategoryMenuClick : undefined}
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
          <Link href="/my/favorites">
            <div className="flex items-center justify-center p-1 gap-0.5">
              <LikeIconSvg isLiked={false} className="pointer-events-none" />
              <p
                className={`text-primary-950 text-sm/[17px] tracking-tight ${pathname === "/my/favorites" ? "font-bold" : "font-normal"}`}
              >
                찜목록
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center sm:gap-5">
          <Link href="/cart">
            <div className="relative w-[24px] h-[24px]">
              <Image src={ic_cart} alt="장바구니" fill className="object-contain" />
              {user?.cartItemCount !== undefined && user.cartItemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {user.cartItemCount}
                </div>
              )}
            </div>
          </Link>

          <div className="hidden sm:block">
            <Link href="/profile">
              <ProfileAvatar label={user?.name?.[0] || ""} />
            </Link>
          </div>
          <VerticalBarIconSvg className="hidden sm:block text-primary-100" />
          <button
            onClick={logout}
            className="cursor-pointer hidden sm:block font-normal text-primary-950 hover:font-bold transition-all"
          >
            로그아웃
          </button>
        </div>
        {/* 여기에 menu 누를시 SideMenu 화면 옆에 나오도록 */}
        <HamburgerMenuIconSvg className="md:hidden text-primary-400" onClick={handleMenuClick} />

        <SideMenu
          items={sideMenuItems}
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
          onAllCategoriesClick={handleAllCategoriesClick}
          onClose={() => setIsCategoryMenuOpen(false)}
          useExternalState
        />
      </div>
    </header>
  );
}
