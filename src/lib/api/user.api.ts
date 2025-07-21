import { cookieFetch } from "./fetchClient.api";

// 사용자 관련 API 함수들
export const getUserApi = async () => {
  return cookieFetch("/users/me");
};

// export const updateUserApi = async (userData: any) => {
//   return cookieFetch("/users/update", {
//     method: "PUT",
//     body: JSON.stringify(userData),
//   });
// };
