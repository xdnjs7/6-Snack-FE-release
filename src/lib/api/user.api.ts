import type { User } from "@/providers/AuthProvider";

export const getUserApi = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const response = await fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("유저 정보를 가져오는데 실패했습니다");
  return await response.json();
};

export const updateUserApi = async (userData: Partial<User>) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  if (!response.ok) throw new Error("유저 정보 업데이트에 실패했습니다");
  return await response.json();
};
