// 개발 완료시 디렉토리 및 파일 반드시 삭제
// 빠진 link있을 수 있음 필요하다면 추가해서 사용 가능!

export type UserRole = "비회원" | "일반유저" | "관리자" | "최고 관리자";
export type Progress = "시작 전" | "진행 중" | "리팩터링 중" | "완성" | "QA 중";

export interface DevNavLink {
  name: string;
  path: string;
  role: UserRole;
  progress: Progress;
}

export interface DevNavSection {
  category: string;
  links: DevNavLink[];
}

export const navLinks: DevNavSection[] = [
  {
    category: "공통 컴포넌트",
    links: [{ name: "공통 컴포넌트", path: "/components-preview", role: "비회원", progress: "완성" }],
  },
  {
    category: "랜딩",
    links: [{ name: "랜딩 페이지", path: "/", role: "비회원", progress: "리팩터링 중" }],
  },
  {
    category: "인증/인가",
    links: [
      { name: "로그인", path: "/login", role: "비회원", progress: "리팩터링 중" },
      { name: "회원가입", path: "/signup", role: "비회원", progress: "완성" },
      { name: "최고 관리자 회원가입", path: "/signup/super-admin", role: "비회원", progress: "진행 중" },
    ],
  },
  {
    category: "관리",
    links: [
      { name: "회원 관리", path: "/manage/users", role: "최고 관리자", progress: "리팩터링 중" },
      { name: "예산 관리", path: "/manage/budgets", role: "최고 관리자", progress: "진행 중" },
      { name: "프로필", path: "/profile", role: "일반유저", progress: "리팩터링 중" },
    ],
  },
  {
    category: "상품",
    links: [
      { name: "상품 리스트", path: "/products", role: "일반유저", progress: "진행 중" },
      { name: "상품 상세", path: "/products/:productId", role: "일반유저", progress: "리팩터링 중" },
      { name: "찜 목록", path: "/my/likes", role: "일반유저", progress: "시작 전" },
      { name: "상품 등록 내역", path: "/my/products", role: "일반유저", progress: "리팩터링 중" },
    ],
  },
  {
    category: "장바구니",
    links: [
      { name: "장바구니", path: "/cart", role: "일반유저", progress: "리팩터링 중" },
      { name: "주문", path: "/cart/order", role: "일반유저", progress: "리팩터링 중" },
      { name: "구매 완료", path: "/cart/order-confirmed", role: "일반유저", progress: "시작 전" },
    ],
  },
  {
    category: "구매 요청",
    links: [
      { name: "구매 요청 관리", path: "/order-manage", role: "관리자", progress: "리팩터링 중" },
      { name: "구매 요청 관리 상세", path: "/order-manage/:orderId", role: "관리자", progress: "시작 전" },
      { name: "구매 내역 확인", path: "/order-history", role: "관리자", progress: "진행 중" },
      { name: "구매 내역 확인 상세", path: "/order-history/:orderId", role: "관리자", progress: "진행 중" },
      { name: "내 구매 요청 내역", path: "/my/order-list", role: "일반유저", progress: "리팩터링 중" },
      { name: "내 구매 요청 내역 상세", path: "/my/order-list/:orderId", role: "일반유저", progress: "진행 중" },
    ],
  },
];
