import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 현재 URL 경로 가져오기
  const { pathname } = request.nextUrl;

  // 쿠키에서 인증 토큰 확인 (서버에서 실행되므로 request 객체 사용)
  const authToken = request.cookies.get("accessToken")?.value;

  // 인증 상태 확인 : 쿠키만료기한과 토큰만료기한이 같으므로 토큰존재여부로 인증상태확인 가능
  const isAuthenticated = !!authToken;

  // 인증 관련 경로 확인 - 라우트 그룹으로 인해 URL은 /login, /signup
  const authPaths = ["/login", "/signup"];
  const isAuthRoute = authPaths.some((path) => pathname === path);

  // protected 폴더 경로 확인 (main 그룹의 모든 경로, products 제외)
  const isProtectedRoute =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/manage") ||
    pathname.startsWith("/my") ||
    pathname.startsWith("/order-history") ||
    pathname.startsWith("/order-manage") ||
    pathname.startsWith("/profile");

  // 로그인한 사용자가 인증 경로(로그인, 회원가입)에 접근하는 경우
  if (isAuthRoute && isAuthenticated) {
    // 인증된 사용자는 메인 페이지로 리디렉션
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인하지 않은 사용자가 protected 경로에 접근하는 경우
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 그 외의 경우는 정상적으로 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 지정
export const config = {
  matcher: [
    // API 경로와 정적 파일은 제외
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
