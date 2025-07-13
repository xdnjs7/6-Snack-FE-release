/**
 * 카테고리 메뉴 아이템 타입 (Prisma 스키마 기반)
 */
export type TCategoryItem = {
  /** 고유 식별자 */
  id: number;
  /** 카테고리 이름 */
  name: string;
  /** 부모 카테고리 ID */
  parentId?: number | null;
  /** 서브 카테고리들 */
  children?: TCategoryItem[];
  /** 현재 활성화 상태 */
  isActive?: boolean;
  /** 메뉴 아이콘 (선택사항) */
  icon?: React.ReactNode;
  /** 페이지 경로 (선택사항) */
  href?: string;
};

/**
 * SubCategoryMenu Props 타입
 */
export type TSubCategoryMenuProps = {
  /** 메인 카테고리 아이템 배열 */
  categories: TCategoryItem[];
  /** 현재 페이지 경로 (활성화 상태 결정) */
  currentPath?: string;
  /** 메뉴 아이템 클릭 시 호출되는 콜백 */
  onItemClick?: (item: TCategoryItem) => void;
  /** 추가 CSS 클래스 */
  className?: string;
}; 