import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// JWT 토큰에서 사용자 역할 추출하는 함수
function getUserRoleFromToken(token: string): string | null {
  try {
    // JWT의 payload 부분 디코딩 (base64url 디코딩)
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log('payload', payload)
    console.log('[getUserRoleFromToken] token:', token);
    console.log('[getUserRoleFromToken] role:', payload.role);
    return payload.role || null;
  } catch (e) {
    console.log('[getUserRoleFromToken] Error:', e);
    return null;
  }
}

export function middleware(request: NextRequest) {
  // 현재 URL 경로 가져오기
  const { pathname } = request.nextUrl;
  console.log('[middleware] pathname:', pathname);

  // 쿠키에서 인증 토큰 확인
  const authToken = request.cookies.get("accessToken")?.value;
  console.log('[middleware] accessToken:', authToken);
  console.log("어쓰토큰+패스네임:",authToken,pathname)
  //==========================================

  // JWT 토큰에서 사용자 역할 추출
  const userRole = authToken ? getUserRoleFromToken(authToken) : null;
  console.log('[middleware] userRole:', userRole);

  // 인증 상태 확인 : 쿠키만료기한과 토큰만료기한이 같으므로 토큰존재여부로 인증상태확인 가능
  const isAuthenticated = !!authToken;
  console.log('[middleware] isAuthenticated:', isAuthenticated);

  // 인증 관련 경로 확인 - 라우트 그룹으로 인해 URL은 /login, /signup
  const authPaths = ["/login", "/signup"];
  const isAuthRoute = authPaths.some((path) => pathname === path);
  console.log('[middleware] isAuthRoute:', isAuthRoute);

  // protected 폴더 경로 확인 (main 그룹의 모든 경로, products 제외)
  const isProtectedRoute =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/manage") ||
    pathname.startsWith("/my") ||
    pathname.startsWith("/order-history") ||
    pathname.startsWith("/order-manage") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/products");
  console.log('[middleware] isProtectedRoute:', isProtectedRoute);

  // 로그인한 사용자가 인증 경로(로그인, 회원가입)에 접근하는 경우
  if (isAuthRoute && isAuthenticated) {
    console.log('[middleware] Authenticated user accessing auth route, redirecting to /');
    // 인증된 사용자는 메인 페이지로 리디렉션
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인하지 않은 사용자가 protected 경로에 접근하는 경우
  if (isProtectedRoute && !isAuthenticated) {
    console.log('[middleware] Unauthenticated user accessing protected route, redirecting to /login');
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 역할 기반 접근 제어 (인증된 사용자만)
  if (isAuthenticated && userRole) {
    // 1. 일반유저(USER)가 접근할 수 없는 경로들
    const userRestrictedPaths = [
      "/manage/users",      // 회원관리
      "/manage/budgets",    // 예산관리
      "/order-manage",      // 구매요청관리
      "/order-history",     // 구매내역확인
    ];
    console.log('[middleware] userRestrictedPaths:', userRestrictedPaths);

    // 2. 일반유저가 아닌 경우(ADMIN, SUPER_ADMIN) 접근할 수 없는 경로
    const nonUserRestrictedPaths = [
      "/cart/order",              // 장바구니-주문
    ];
    console.log('[middleware] nonUserRestrictedPaths:', nonUserRestrictedPaths);

    // 일반유저 제한 체크 (6개 경로: 회원관리, 예산관리, 구매요청관리, 구매요청관리상세, 구매내역확인, 구매내역확인상세)
    if (userRole === "USER") {
      const isUserRestricted = userRestrictedPaths.some(path => 
        pathname === path || pathname.startsWith(path + "/")
      );
      console.log('[middleware] isUserRestricted:', isUserRestricted);
      if (isUserRestricted) {
        console.log('[middleware] USER role restricted, redirecting to /error');
        return NextResponse.redirect(new URL("/error", request.url));
      }
    }

    // 일반유저가 아닌 경우 제한 체크 (장바구니-주문 접근 불가)
    if (userRole !== "USER") {
      const isNonUserRestricted = nonUserRestrictedPaths.some(path => 
        pathname === path || pathname.startsWith(path + "/")
      );
      console.log('[middleware] isNonUserRestricted:', isNonUserRestricted);
      if (isNonUserRestricted) {
        console.log('[middleware] Non-USER role restricted, redirecting to /error?from=order');
        return NextResponse.redirect(new URL("/error?from=order", request.url));
      }
    }
  }

  // 로그인한 사용자가 "/"로 접근하는 경우 /products로 리디렉션
  if (pathname === "/" && isAuthenticated) {
    console.log('[middleware] Authenticated user accessing /, redirecting to /products');
    return NextResponse.redirect(new URL("/products", request.url));
  }

  // 그 외의 경우는 정상적으로 진행
  console.log('[middleware] Passing through');
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 지정
export const config = {
  matcher: [
    // API 경로와 정적 파일은 제외
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
