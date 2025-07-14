/**
 * 사이드 메뉴 아이템 타입
 */
export type TSideMenuItem = {
  /** 고유 식별자 */
  id: string;
  /** 메뉴에 표시될 텍스트 */
  label: string;
  /** 현재 활성화 상태 (deprecated: currentPath로 대체) */
  isActive?: boolean;
  /** 페이지 경로 (활성화 상태 결정에 사용) */
  href?: string;
};

/**
 * 사이드 메뉴 컴포넌트 Props 타입
 */
export type TSideMenuProps = {
  /** 메뉴 아이템 배열 */
  items: TSideMenuItem[];
  /** 메뉴 열림/닫힘 상태 */
  isOpen: boolean;
  /** 현재 페이지 경로 (활성화 상태 결정) */
  currentPath?: string;
  /** 메뉴 아이템 클릭 시 호출되는 콜백 */
  onItemClick?: (item: TSideMenuItem) => void;
  /** 메뉴 닫기 콜백 */
  onClose?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}; 