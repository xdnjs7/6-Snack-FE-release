"use client";

import { TSideMenuProps, TSideMenuItem } from "../../types/sideMenu.types";
import XIconSvg from "../svg/XIconSvg";
import { createPortal } from "react-dom";

/**
 * 사이드 메뉴 컴포넌트
 *
 * @description
 * 오른쪽에서 슬라이드되는 사이드 메뉴 컴포넌트입니다.
 * 현재 페이지 경로에 따라 메뉴 아이템이 활성화됩니다.
 *
 * @example
 * ```tsx
 * import SideMenu from "@/components/common/SideMenu";
 * import { usePathname } from "next/navigation";
 *
 * const MyPage = () => {
 *   const [isMenuOpen, setIsMenuOpen] = useState(false);
 *   const pathname = usePathname();
 *
 *   const menuItems = [
 *     { id: "products", label: "상품 리스트", href: "/products" },
 *     { id: "requests", label: "구매 요청 내역", href: "/requests" },
 *     { id: "mypage", label: "마이페이지", href: "/mypage" },
 *   ];
 *
 *   const handleItemClick = (item: TSideMenuItem) => {
 *     // 페이지 이동 로직
 *     router.push(item.href);
 *     setIsMenuOpen(false);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsMenuOpen(true)}>
 *         메뉴 열기
 *       </button>
 *
 *       <SideMenu
 *         items={menuItems}
 *         isOpen={isMenuOpen}
 *         currentPath={pathname}
 *         onItemClick={handleItemClick}
 *         onClose={() => setIsMenuOpen(false)}
 *       />
 *     </div>
 *   );
 * };
 * ```
 */
export default function SideMenu({ items, isOpen, currentPath, onItemClick, onClose, className = "" }: TSideMenuProps) {
  if (!isOpen) return null;

  const isCurrentPage = (item: TSideMenuItem) => {
    if (!currentPath || !item.href) return false;
    return currentPath === item.href;
  };

  const sideMenuContent = (
    <div className="fixed inset-0 z-[9999]">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Side Menu */}
      <div
        className={`absolute right-0 top-0 w-[255px] h-full bg-white/90 backdrop-blur-lg flex flex-col items-end gap-5 p-6 ${className}`}
      >
        {/* Close Button */}
        <XIconSvg className="w-6 h-6" onClick={onClose} />

        {/* Menu Items */}
        <div className="self-stretch flex flex-col justify-start items-center gap-3">
          {items.map((item) => {
            const isActive = isCurrentPage(item);
            return (
              <div
                key={item.id}
                data-property-1={isActive ? "active" : "normal"}
                className="w-44 h-12 p-2 inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors group"
                onClick={() => onItemClick?.(item)}
              >
                <div
                  className={`justify-start text-base font-['SUIT'] transition-all duration-200 ${
                    isActive ? "text-zinc-800 font-extrabold" : "text-neutral-600 font-normal group-hover:font-bold"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Portal을 사용하여 body에 직접 렌더링
  if (typeof window !== "undefined") {
    return createPortal(sideMenuContent, document.body);
  }

  return sideMenuContent;
}
