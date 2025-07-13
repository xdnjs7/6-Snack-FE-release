"use client";

import { useState } from "react";
import SideMenu from "../SideMenu";
import { TSideMenuItem } from "../../types/sideMenu.types";

const SideMenuExample = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/products");

  const menuItems: TSideMenuItem[] = [
    { id: "product-list", label: "상품 리스트", href: "/products" },
    { id: "purchase-requests", label: "구매 요청 내역", href: "/purchase-requests" },
    { id: "product-registration", label: "상품 등록 내역", href: "/product-registration" },
    { id: "mypage", label: "마이페이지", href: "/mypage" },
    { id: "logout", label: "로그아웃", href: "/logout" },
  ];

  const handleItemClick = (item: TSideMenuItem) => {
    console.log("Clicked item:", item);
    // 기능 구현 시 여기에 로직 추가
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">사이드 메뉴 테스트</h2>
        <div className="space-x-2 mb-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            사이드 메뉴 열기
          </button>
          
          <div className="mt-2 space-x-2">
            <span className="text-sm font-medium">현재 페이지 테스트:</span>
            <button
              onClick={() => setCurrentPath("/products")}
              className={`px-3 py-1 text-sm rounded ${
                currentPath === "/products" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              상품 리스트
            </button>
            <button
              onClick={() => setCurrentPath("/purchase-requests")}
              className={`px-3 py-1 text-sm rounded ${
                currentPath === "/purchase-requests" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              구매 요청 내역
            </button>
            <button
              onClick={() => setCurrentPath("/mypage")}
              className={`px-3 py-1 text-sm rounded ${
                currentPath === "/mypage" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              마이페이지
            </button>
          </div>
        </div>
      </div>
      
      <SideMenu 
        items={menuItems} 
        isOpen={isMenuOpen}
        currentPath={currentPath}
        onItemClick={handleItemClick}
        onClose={handleClose}
      />
    </div>
  );
};

export default SideMenuExample; 