/**
 * 페이지네이션 컴포넌트 Props 타입
 */
export type TPaginationProps = {
  /** 현재 페이지 번호 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 시 호출되는 콜백 */
  onPageChange: (page: number) => void;
  /** 이전 페이지로 이동 시 호출되는 콜백 */
  onPrevPage?: () => void;
  /** 다음 페이지로 이동 시 호출되는 콜백 */
  onNextPage?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}; 