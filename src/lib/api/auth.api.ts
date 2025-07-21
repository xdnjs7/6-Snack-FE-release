export const loginApi = async (email: string, password: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "로그인에 실패했습니다");
  }
  const result = await response.json();
  return result.user ? result.user : result;
};

export const logoutApi = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const registerApi = async (_name: string, _email: string, _password: string) => {
  // 일반 회원가입은 초대 링크가 필요하므로 에러 반환
  throw new Error("일반 회원가입은 초대 링크가 필요합니다");
};

