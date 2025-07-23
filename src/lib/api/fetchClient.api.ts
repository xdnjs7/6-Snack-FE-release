import { logout } from "@/app/actions/auth";
import { refreshAccessToken } from "./auth.api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const cookieFetch = async (path: string, options: RequestInit = {}) => {
  const method = options.method || "GET";
  // 개발 완료후 삭제
  console.log(`🌐 API 요청: ${method} ${API_BASE_URL}${path}`);

  // fetch 호출 부분을 함수로 분리
  const request = async () => {
    return await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  };

  let response = await request();

  // 1차 요청이 실패하고 401인 경우 → 리프레시 토큰으로 재발급
  if (response.status === 401) {
    try {
      console.log("요청함");
      await refreshAccessToken(); // 토큰 재발급
      response = await request(); // 재요청
    } catch (e) {
      console.error("❌ 액세스 토큰 재발급 실패");
      logout(); // 세션 만료 처리
      throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const defaultFetch = async (path: string, options: RequestInit = {}) => {
  const method = options.method || "GET";
  // 개발 완료후 삭제
  console.log(`🌐 API 요청: ${method} ${API_BASE_URL}${path}`);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
