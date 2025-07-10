// 개발 완료시 디렉토리 및 파일 반드시 삭제
// 빠진 link있을 수 있음 필요하다면 추가해서 사용 가능!

export type TNavLink = {
  name: string;
  path: string;
};

export const navLinks: TNavLink[] = [
  { name: "랜딩", path: "/" },
  { name: "회원가입", path: "/signup" },
  { name: "최고관리자 회원가입", path: "/signup/supre-admin" },
  { name: "로그인", path: "/login" },
  { name: "상품 리스트", path: "/products" },
  { name: "상품 상세", path: "/products/:productId" },
  { name: "상품 등록 내역", path: "/my/products/registered" },
  { name: "장바구니", path: "/cart" },
  { name: "구매 요청 내역", path: "/my/order-list" },
  { name: "구매 요청 상세", path: "/my/order-list/:orderId" },
  { name: "구매 요청 관리", path: "/order-manage" },
  { name: "구매 요청 관리 상세", path: "/order-manage/:orderId" },
  { name: "프로필", path: "/profile" },
  { name: "구매 내역", path: "/order-history" },
  { name: "구매 내역 상세", path: "/order-history/:orderId" },
  { name: "예산 관리", path: "/budget/super-admin" },
  { name: "회원 관리", path: "/users/super-admin" },
  { name: "공통 컴포넌트", path: "/components-preview" },
];
