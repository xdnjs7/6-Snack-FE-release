import { cookieFetch } from "./fetchClient.api";

// 사용자 관련 API 함수들
export const getUserApi = async () => {
  const res = await cookieFetch("/users/me");
  return res.user;
};
